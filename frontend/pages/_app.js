import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@lib/apolloClient'
import { GlobalStyles } from "@styles/Global"
import Header from '@components/Header'
import Footer from '@components/Footer'


function App({ Component, pageProps }) {
    const apolloClient = useApollo( pageProps.initialApolloState )

    return (
        <ApolloProvider client={ apolloClient }>
            <GlobalStyles />
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </ApolloProvider>
    )
}


export default App

