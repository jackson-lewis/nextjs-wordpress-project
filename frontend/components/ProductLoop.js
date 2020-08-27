import styled from 'styled-components'
import Product from './Product'
import { minWidth } from './styles/MediaQueries'


const StyledLoop = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-gap: 40px 20px;
    grid-template-columns: 1fr 1fr;

    @media ${ minWidth.medium } {
        grid-gap: 50px 30px;
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media ${ minWidth.large } {
        grid-template-columns: repeat( 4, 1fr );
    }
`

const ProductLoop = ({ data }) => {

    const products = data.products?.edges.map( ({ node }) => node )

    return (
        <StyledLoop>
            { products.map( product => <Product key={ product.id } data={ product } /> ) }
        </StyledLoop>
    )
}

export default ProductLoop