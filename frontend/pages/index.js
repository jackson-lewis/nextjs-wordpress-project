import Head from 'next/head'
import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
import { initializeApollo } from '@lib/apolloClient'
import { MAIN_MENU } from '@components/Header'
import ProductLoop from '@components/ProductLoop'
import { getAllProductsBySlug } from '@lib/api' 
import { SiteSection, SiteContainer } from '@components/SiteLayout'
import styled from 'styled-components'


const StyledPageTitle = styled.h1`
    margin: auto 0 20px;
    text-align: center;

    font-size: 2rem;
`

const StyledSiteSection = styled( SiteSection )`
    margin-bottom: 60px;
`

const GET_FEATURE_PRODUCTS = gql`
    query GetFeatureProducts {
        products(where: {type: SIMPLE}, first: 4) {
            edges {
                node {
                    ... on SimpleProduct {
                        id
                        name
                        slug
                        price
                        image {
                            mediaDetails {
                                sizes {
                                    sourceUrl
                                    name
                                }
                            }
                            altText
                        }
                    }
                }
            }
        }
    }
`


const HomePage = () => {
    const { data, loading, error } = useQuery( GET_FEATURE_PRODUCTS )

    if ( loading ) return <p>Loading...</p>
    if ( error ) return `Error! ${ error }`

    return (
        <>
            <Head>
                <title>Next.js WordPress Project</title>
                <meta name="description" content="This is the experimental lab for Next.js and WordPress." />
            </Head>
            <StyledSiteSection>
                <SiteContainer>
                    <StyledPageTitle>Next.js WordPress Project</StyledPageTitle>
                    <img src="./do-something.jpg" alt="Do something" />
                </SiteContainer>
            </StyledSiteSection>

            <div>
                <SiteContainer>
                    <h2 style={{ textAlign: 'center' }}>Latest Products</h2>
                    <ProductLoop data={ data } />
                </SiteContainer>
            </div>
        </>
    )
}

export async function getStaticProps() {
    const apolloClient = initializeApollo()
  
    await apolloClient.query({
        query: MAIN_MENU
    })

    await apolloClient.query({
        query: GET_FEATURE_PRODUCTS
    })
  
    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      },
      revalidate: 1,
    }
  }


export default HomePage
