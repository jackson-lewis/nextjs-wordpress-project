import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
import styled from 'styled-components'
import { SiteContainer } from './SiteLayout'


const StyledHeader = styled.header`
    width: 100%;
    padding: 20px;   
`

const StyledNav = styled.nav`
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
`

const StyledMenuItem = styled.li`
    margin-bottom: 8px;

    a {
        padding: 4px 0;
    }
`


export const MAIN_MENU = gql`
    query GetMainMenuItems {
        menu(id: "dGVybToy") {
            name
            slug
            menuItems( where: { parentId: "null" } ) {
                edges {
                    node {
                    path
                    label
                    databaseId
                    childItems {
                        edges {
                            node {
                                label
                                path
                                databaseId
                            }
                        }
                    }
                    }
                }
            }
            databaseId
        }
    }
`

const PROD_URL = 'https://nextjs.jacksonlewis.dev'

const calcPath = path => {
    const url = PROD_URL.replace( /(\/)/g, '\\/' )
    const regex = new RegExp( url )

    return path.replace( regex, '' )
}


const Header = () => {
    const { data, loading, error } = useQuery( MAIN_MENU )

    if ( loading ) return <p>Loading...</p>
    if ( error ) return <p>Error...</p>

    const menuItems = data.menu.menuItems.edges.map( ({ node }) => node )

    return (
        <StyledHeader>
            <SiteContainer>
                <Link href="/">
                    <a>Next.js WordPress Project</a>
                </Link>
                <StyledNav>
                    <ul>
                        { menuItems.map( item => {
                            const subItems = item.childItems.edges.map( item => item?.node )
    
                            return (
                                <StyledMenuItem key={ item.databaseId }>
                                    <Link href="/[page]" as={ calcPath( item.path ) }><a>{ item.label }</a></Link>
                                    { subItems.length > 0 ?
                                        <ul>
                                            { subItems.map( subItem => (
                                                <StyledMenuItem key={ subItem.databaseId }>
                                                    <Link href="/[page]" as={ calcPath( subItem.path ) }><a>{ subItem.label }</a></Link>
                                                </StyledMenuItem>
                                            ))}
                                        </ul>
                                    : '' }
                                </StyledMenuItem>
                            )
                        })}
                    </ul>
                </StyledNav>
            </SiteContainer>
        </StyledHeader>
    )
}


export default Header
