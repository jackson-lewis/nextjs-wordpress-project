import { createGlobalStyle } from "styled-components"
import { colors, typography } from "./Variables"


const GlobalStyles = createGlobalStyle`
    :root {
        --primary: ${ colors.primary };
        --secondary: ${ colors.secondary };

        --blue: ${ colors.blue };

        --white: ${ colors.white };
        --black: ${ colors.black };
        --grey: ${ colors.grey };

        --body-color: var( --white );
        --heading-color: var( --white );
        --link-color: var( --blue );
        --outline-color: #403838;

        --font: 'Rubik', sans-serif;

        --base-font-size: ${ typography.baseFontSize }rem;
        --base-line-height: ${ typography.baseLineHeight };
        --baseline: calc( var( --base-font-size ) * var( --base-line-height ) );

        --header-height: 60px;
        --site-margin: 16px;
        --site-gutter: 16px;
        --site-container: 1100px;
        --border-radius: 4px;
    }

    body {
        margin: 0;
        
        font-family: var( --font );
        font-size: var( --base-font-size );
        font-weight: 400;
        font-style: normal;
        background-color: var( --black );
        color: var( --body-color );
    }

    img {
        max-width: 100%;
        display: block;
    }

    a {
        color: var( --link-color );
    }
`


export { GlobalStyles }
