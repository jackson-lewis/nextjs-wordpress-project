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
            <Header />
            <Component {...pageProps} />
            <Footer />
        </ApolloProvider>
    )
}


export default App

