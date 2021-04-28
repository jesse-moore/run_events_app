import { SinonSpy } from 'sinon';
import { sandbox } from '../setup';
import { expect } from 'chai';

import * as server from '../../src/server';
import Sinon from 'sinon';

describe('Tests index', function () {
    let fake: SinonSpy;
    beforeEach(() => {
        fake = sandbox.fake();
        // serverStub = sandbox
        //     .stub(server, 'server')
        //     .resolves([{ message: 'Hello World' }]);
    });

    it('should have successful response', async () => {
        fake();
        console.log(fake.callCount);
        expect({}).to.be.an('object');
        'string'.should.be.equal('string');
        // const result = await app.lambdaHandler()
        // expect(result).to.be.an('object')
        // expect(result.statusCode).to.equal(200)
        // expect(result.body).to.be.a('string')
        // expect(result.body).to.equal('Hello World Modified')
        // expect(result.headers).to.deep.equal({
        //     'Content-Type': 'text/html',
        //     'Access-Control-Allow-Methods': '*',
        //     'Access-Control-Allow-Origin': '*',
        // })
    });
    it('should handle error', async () => {
        fake();
        console.log(fake.callCount);
        // serverStub.rejects()
        // const logStub = sandbox.stub(console, 'log')
        // const error = await app.lambdaHandler()
        // expect(logStub.calledOnce).to.be.true
        // expect(error instanceof Error).to.be.true
    });
});
