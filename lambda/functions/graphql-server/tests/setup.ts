import chai from 'chai';
import sinon, { SinonSandbox, SinonStub } from 'sinon';
const globalAny: any = global;
const sandbox = sinon.createSandbox();

before(() => {
    chai.should();
    chai.use(require('sinon-chai'));
    chai.use(require('chai-like'));
    globalAny.chai = chai;
});

beforeEach(() => {
    
});

afterEach(() => {
    sandbox.restore();
});

export { sandbox };
