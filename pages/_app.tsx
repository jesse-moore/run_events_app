import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/graphql/apollo'
import { Provider } from 'react-redux'
import store from '../lib/redux/store'

import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps.initialApolloState)

    return (
        <ApolloProvider client={apolloClient}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </ApolloProvider>
    )
}
