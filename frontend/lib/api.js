import { gql } from '@apollo/client'
import { initializeApollo } from '../lib/apolloClient'


const GET_ALL_PAGES_BY_SLUG = gql`
    query GetPagesBySlug {
        pages(where: {parentIn: "null"}) {
            edges {
                node {
                    slug
                }
            }
        }
    }
`

const GET_ALL_PRODUCTS_BY_SLUG = gql`
    query GetProductsBySlug {
        products(where: {type: SIMPLE}) {
            edges {
                node {
                    slug
                }
            }
        }
    }
`


export async function getAllPagesBySlug() {
    const apolloClient = initializeApollo()
  
    const data = await apolloClient.query({
        query: GET_ALL_PAGES_BY_SLUG
    })
  
    return data
}

export async function getAllProductsBySlug() {
    const apolloClient = initializeApollo()
  
    const data = await apolloClient.query({
        query: GET_ALL_PRODUCTS_BY_SLUG
    })
  
    return data
}