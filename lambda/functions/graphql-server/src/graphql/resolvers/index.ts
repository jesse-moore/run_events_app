const resolvers = {
    Query: {
        user: () => ({ id: 123, name: 'John Doe' }),
    },
};

export default resolvers;
