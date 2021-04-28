import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
    type Query {
        user: User
    }

    type User {
        id: ID
        name: String
    }
`;

export default [typeDefs];
