import { ApolloServer } from 'apollo-server-micro'
import { validateJWT } from '../../lib/cognito'
import { schema } from '../../lib/graphql/schema'

const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }) => {
        const token = req.headers.authorization
        const user = await validateJWT(token)
        return { user }
    },
})

export const config = {
    api: {
        bodyParser: false,
    },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
