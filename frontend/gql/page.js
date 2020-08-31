import { gql } from '@apollo/client'


/**
 * Currently only fecthes pages with no parent page
 */
export const ALL_PAGES_SLUG_ONLY = gql`
    query AllPagesSlugOnly {
        pages(where: {parentIn: "null"}) {
            edges {
                node {
                    slug
                }
            }
        }
    }
`

/**
 * Called on [page].js to retrieve the data of the page
 * 
 * @var {string} path The slug of the page
 */
export const PAGE = gql`
    query GetPageData($path: ID!) {
        page(id: $path, idType: URI) {
            databaseId
            title
            content
        }
    }
`
