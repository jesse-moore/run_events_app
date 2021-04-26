module.exports = function (wallaby) {
    return {
        files: ['src/**/*.*', './index.js'],

        tests: ['tests/unit/**/*test.js'],
        env: {
            type: 'node',
            runner: 'node',
        },
        setup: (wallaby) => {
            const chai = require('chai')
            chai.should()
            // chai.use(require('sinon-chai'))
            // chai.use(require('chai-like'))
            global.expect = require('chai').expect
        },
        testFramework: 'mocha',
        filesWithNoCoverageCalculated: [],
        runMode: 'onsave',
        trace: true,
    }
}
