import { initializeApollo } from '@lib/apolloClient'
import { ALL_PAGES_SLUG_ONLY } from '@gql/page'
import { ALL_PRODUCTS_SLUG_ONLY } from '@gql/product'


/**
 * Get the slug of all pages
 * 
 * @todo Checks need to done for how this handles pages with a parent.
 * 
 * @return {array} An array of strings being the page paths
 */
export async function getAllPagesBySlug() {
    const apolloClient = initializeApollo()
  
    const data = await apolloClient.query({
        query: ALL_PAGES_SLUG_ONLY
    })

    const pagePaths = data.data.pages.edges?.map( ({ node }) => `/${ node.slug }` ) || []

    return pagePaths
}


/**
 * Get the slug of all the simple products
 * 
 * @return {array} An array of strings being the product paths
 */
export async function getAllProductsBySlug() {
    const apolloClient = initializeApollo()
  
    const data = await apolloClient.query({
        query: ALL_PRODUCTS_SLUG_ONLY
    })

    const productPaths = data.data.products.edges?.map( ({ node }) => `/product/${ node.slug }` ) || []

    return productPaths
}
