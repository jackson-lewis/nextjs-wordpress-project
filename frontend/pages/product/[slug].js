import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import { initializeApollo } from '../../lib/apolloClient'
import { MAIN_MENU } from '../../components/Header'
import { getAllProductsBySlug } from '../../lib/api' 
import { SiteSection, SiteContainer } from '../../components/SiteLayout'


const GET_PRODUCT = gql`
    query GetProduct($slug: ID!) {
        product(id: $slug, idType: SLUG) {
            name
            image {
                altText
                mediaItemUrl
            }
            ... on SimpleProduct {
                id
                name
                price
                description
            }
            productId
        }
    }
`

const ProductSingle = ({ slug }) => {
    const { data, loading, error } = useQuery( GET_PRODUCT, {
        variables: {
            slug
        }
    })

    if ( loading ) return <p>Loading...</p>
    if ( error ) return `Error! ${ error }`

    const { product } = data

    return (
        <main className={ `product` }>
            <SiteSection>
                <SiteContainer>
                    <img src={ product.image.mediaItemUrl } />
                    <h1>{ product.name }</h1>
                    <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
                </SiteContainer>
            </SiteSection>
        </main>
    )
}


export async function getStaticProps({ params }) {
    const apolloClient = initializeApollo()

    await apolloClient.query({
        query: MAIN_MENU
    })

    await apolloClient.query({
        query: GET_PRODUCT,
        variables: {
            slug: params.slug
        }
    })

    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
            slug: params.slug
        },
        revalidate: 60,
    }
}

export async function getStaticPaths() {
    const data = await getAllProductsBySlug()

    const products = data.data.products.edges?.map( ({ node }) => `/product/${node.slug}` ) || []

    return {
        paths: products,
        fallback: false
    }
}

export default ProductSingle
