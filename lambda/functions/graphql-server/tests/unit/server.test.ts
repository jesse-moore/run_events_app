// 'use strict'
// import sinon from 'sinon'
// import proxyquire from 'proxyquire'
// import app from '../../src'
// const mysql = require('serverless-mysql')()
// import server from '../../src/server'
// const expect = chai.expect
// let sandbox, mysqlStub, mysqlConnectStub, serverStub

// const event = {
//     pathParameters: { 
//         name: 'johndoe',
//     },
// }
// var context

// var successConnectionObject = {
//     connect: function () {
//         return Promise.resolve()
//     },
//     query: function (sqlQuery, params) {
//         return Promise.resolve([
//             {
//                 first_name: 'first',
//                 last_name: 'last',
//                 bk: 'bk',
//                 current_team: 'team',
//             },
//         ])
//     },
//     end: function () {},
// }

// const stub = sinon.stub().returns(successConnectionObject)
// mysqlStub = proxyquire('../../src/server', { 'serverless-mysql': stub })
// serverStub = sinon.stub(server, 'server').resolves("server")

describe('Tests index', function () {
    beforeEach(() => {
        // sandbox = sinon.createSandbox()
        // mysqlStub = sandbox.stub(server, 'server')
        // mysqlConnectStub = sandbox.stub(mysql, 'connect')
    })

    afterEach(() => {
        // sandbox.restore()
    })

    it('verifies successful response', async () => {
        // mysqlStub.resolves([{ message: 'Hello World' }])
        // const result = await app.lambdaHandler(event, context)
		// console.log(result)
        // console.log(await serverStub())
        // expect(result).to.be.an('object');
        // expect(result.statusCode).to.equal(200);
        // expect(result.body).to.be.an('string');
        // let response = JSON.parse(result.body);
        // expect(response).to.be.an('object');
        // expect(response.message).to.be.equal("hello world");
        // expect(response.location).to.be.an("string");
    })
})
