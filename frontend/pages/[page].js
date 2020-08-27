import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import { initializeApollo } from '../lib/apolloClient'
import { MAIN_MENU } from '../components/Header'
import { getAllPagesBySlug } from '../lib/api' 


const GET_PAGE = gql`
    query GetPageData($path: ID!) {
        page(id: $path, idType: URI) {
            databaseId
            title
            content
        }
    }
`

const DefaultPage = ({ path }) => {

    const { data, loading, error } = useQuery( GET_PAGE, {
        variables: {
            path
        }
    })

    if ( loading ) return <p>Loading...</p>
    if ( error ) return `Error! ${ error }`

    const { page } = data

    return (
        <>
            <Head>
                <title>{ page.title } - Next.js WordPress Project</title>
            </Head>    
            <main>
                <h1>{ page.title }</h1>
            </main>
        </>
    )
}


export async function getStaticProps({ params }) {
    const apolloClient = initializeApollo()

    await apolloClient.query({
        query: MAIN_MENU
    })

    await apolloClient.query({
        query: GET_PAGE,
        variables: {
            path: params.page
        }
    })

    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
            path: params.page
        },
        revalidate: 60,
    }
}

export async function getStaticPaths() {
    const data = await getAllPagesBySlug()

    const pages = data.data.pages.edges?.map( ({ node }) => `/${ node.slug }` ) || []

    return {
        paths: pages,
        fallback: false
    }
}

export default DefaultPage
