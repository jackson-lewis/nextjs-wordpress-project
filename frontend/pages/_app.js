import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import { GlobalStyles } from "../components/styles/Global"
import Header from '../components/Header'
import Footer from '../components/Footer'


function App({ Component, pageProps }) {
    const apolloClient = useApollo( pageProps.initialApolloState )

    return (
        <ApolloProvider client={ apolloClient }>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link href="https://fonts.gstatic.com/" rel="preconnect"></link>
                <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;600&display=swap" rel="stylesheet"></link>
            </Head>
            <GlobalStyles />
            <Header />
            <Component {...pageProps} />
            <Footer />
        </ApolloProvider>
    )
}


export default App
