// @ts-ignore
import EasyGraphQLTester from 'easygraphql-tester';
import schema from '../../../../src/graphql/schema';
import '../../../setup';
const tester = new EasyGraphQLTester(schema);

describe('schema test', () => {
    before(() => {

    }); 

    it('should ', async () => {
        const query = `
			query {
				user {
					name
					id
				}
			}`;
        const { data, errors } = tester.mock({
            query,
        });
		console.log(data)
    });
});
// Try `npm i --save-dev @types/easygraphql-tester` if it exists or add a new declaration (.d.ts) file containing `declare module 'easygraphql-tester';`ts(7016)
