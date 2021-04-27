'use strict'
const sinon = require('sinon')
const app = require('../../index')
const chai = require('chai')
const server = require('../../src/server')
const expect = chai.expect
let sandbox, serverStub

describe('Tests index', function () {
    beforeEach(() => {
        sandbox = sinon.createSandbox()
        serverStub = sandbox
            .stub(server, 'server')
            .resolves([{ message: 'Hello World' }])
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should have successful response', async () => {
        const result = await app.lambdaHandler()
        expect(result).to.be.an('object')
        expect(result.statusCode).to.equal(200)
        expect(result.body).to.be.a('string')
        expect(result.body).to.equal('Hello World')
        expect(result.headers).to.deep.equal({
            'Content-Type': 'text/html',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        })
    })
    it('should handle error', async () => {
        serverStub.rejects()
        const logStub = sandbox.stub(console, 'log')
        const error = await app.lambdaHandler()
        expect(logStub.calledOnce).to.be.true
        expect(error instanceof Error).to.be.true
    })
})
