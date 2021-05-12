module.exports = function (wallaby) {
    return {
        files: [
            '/src/**/*.*',
            {
                pattern: 'lambda/functions/graphql-server/tests/setup.ts',
                instrument: false,
            },
        ],

        tests: ['test/**/*test.ts'],

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
        testFramework: 'jest',
        filesWithNoCoverageCalculated: [],
        runMode: 'onsave',
        trace: true,
    }
}
