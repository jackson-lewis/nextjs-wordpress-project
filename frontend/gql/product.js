import { gql } from '@apollo/client'


/**
 * Currently only fecthes simple products
 */
export const ALL_PRODUCTS_SLUG_ONLY = gql`
    query GetProductsBySlug {
        products(where: {type: SIMPLE}, first: 4) {
            edges {
                node {
                    slug
                }
            }
        }
    }
`
