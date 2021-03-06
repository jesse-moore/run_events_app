import { IncomingMessage, ServerResponse } from 'http';
import { useMemo } from 'react';
import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { getJWT } from '../cognito';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export type ResolverContext = {
    req?: IncomingMessage;
    res?: ServerResponse;
};

const authLink = setContext((_, { headers }) => {
    return new Promise((resolve) => {
        // get the authentication token from local storage if it exists
        getJWT()
            .then((token) => {
                // return the headers to the context so httpLink can read them
                resolve({
                    headers: {
                        ...headers,
                        authorization: token ? `Bearer ${token}` : '',
                    },
                });
            })
            .catch((_err) => {
                resolve(null);
            });
    });
});

const uploadLink = createUploadLink({
    uri: 'http://localhost:3001/graphql',
    // uri: 'http://api.rmap.site/graphql',
    credentials: 'same-origin',
});

function createApolloClient(_context?: ResolverContext) {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: authLink.concat(uploadLink),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo(
    initialState: any = null,
    // Pages with Next.js data fetching methods, like `getStaticProps`, can send
    // a custom context which will be used by `SchemaLink` to server render pages
    context?: ResolverContext
) {
    const _apolloClient = apolloClient ?? createApolloClient(context);

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // get hydrated here
    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export { apolloClient };

export function useApollo(initialState: any) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}
