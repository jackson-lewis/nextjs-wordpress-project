import PropTypes from 'prop-types'
import Link from 'next/link'
import styled from 'styled-components'


const StyledProduct = styled.li`
    margin: 0;

    a {
        text-decoration: none;
    }
`

const StyledThumbnail = styled.img`
    width: 100%;

    transition: 200ms ease-in-out;

    :hover {
        transform: translateY( -4px );
    }
`

const StyledProductDetails = styled.div`
    width: 100%;
    padding: 8px 8px 0;
`

const StyledTitle = styled.h3`
    margin: 0 0 4px;

    color: #EAEAEA;
    font-weight: 300;
`

const StyledPrice = styled.span`
    display: inline-block;

    font-size: 0.9rem;
    font-weight: 600;
`


const Product = ({ data }) => {

    /**
     * Extract the thumbnail size from an array of objects 
     * 
     * @param {array} image Sizes of the image
     */
    const getThumbnailSize = image => {
        const thumbnail = image.filter( ({ name }) => name === 'woocommerce_thumbnail' )

        return thumbnail[0].sourceUrl
    }

    const thumbnailUrl = getThumbnailSize( data.image.mediaDetails.sizes )

    return (
        <StyledProduct>
            <Link href="/product/[slug]" as={ `/product/${ data.slug }` }>
                <a>
                    <StyledThumbnail src={ thumbnailUrl } />
                    <StyledProductDetails>
                        <StyledTitle>{ data.name }</StyledTitle>
                        <StyledPrice>{ data.price }</StyledPrice>
                    </StyledProductDetails>
                </a>
            </Link>
        </StyledProduct>   
    )
}

Product.propTypes = {
    data: PropTypes.object.isRequired
}


export default Product
