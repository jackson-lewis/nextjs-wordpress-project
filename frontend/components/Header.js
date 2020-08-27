import Router from 'next/router'
import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
import NProgress from 'nprogress'
import styled from 'styled-components'
import { SiteContainer } from './SiteLayout'


Router.onRouteChangeStart = () => {
    NProgress.start()
}
Router.onRouteChangeComplete = () => {
    NProgress.done()
}

Router.onRouteChangeError = () => {
    NProgress.done()
}


const StyledHeader = styled.header`
    width: 100%;
    padding: 20px;   
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
                <nav>
                    <ul>
                        { menuItems.map( item => {
                            const subItems = item.childItems.edges.map( item => item?.node )
    
                            return (
                                <li key={ item.databaseId }>
                                    <Link href="/[page]" as={ item.path }><a>{ item.label }</a></Link>
                                    { subItems.length > 0 ?
                                        <ul>
                                            { subItems.map( subItem => (
                                                <li key={ subItem.databaseId }>
                                                    <Link href="/[page]" as={ subItem.path }><a>{ subItem.label }</a></Link>
                                                </li>
                                            ))}
                                        </ul>
                                    : '' }
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </SiteContainer>
        </StyledHeader>
    )
}


export default Header
