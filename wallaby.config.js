module.exports = function (wallaby) {
    return {
        files: [
            '/src/**/*.*',
            {
                pattern: 'lambda/functions/graphql-server/tests/setup.ts',
                instrument: false,
            },
        ],

        tests: ['lambda/functions/graphql-server/tests/unit/**/*test.ts'],

        env: {
            type: 'node',
            runner: 'node',
        },
        compilers: {
            '**/*.ts': wallaby.compilers.typeScript({
                /* TypeScript compiler specific options
                 * https://github.com/Microsoft/TypeScript/wiki/Compiler-Options
                 * (no need to duplicate tsconfig.json, if you have it, it will be automatically used) */
            }),
        },
        setup: (wallaby) => {
            const chai = require('chai')
            chai.should()
            // chai.use(require('sinon-chai'))
            // chai.use(require('chai-like'))
            global.chai = chai
            global.expect = require('chai').expect
        },
        testFramework: 'mocha',
        filesWithNoCoverageCalculated: [],
        runMode: 'onsave',
        trace: true,
    }
}
