/**
 * Width breakpoints
 */
const widthBreakpoints = {
    small: 375,
    medium: 768,
    large: 1024,
    xlarge: 1600
}

const minWidthFN = value => `@media screen and ( min-width: ${ value }px )`


const minWidth = {
    small: `screen and ( min-width: ${ widthBreakpoints.small }px )`,
    medium: `screen and ( min-width: ${ widthBreakpoints.medium }px )`,
    large: `screen and ( min-width: ${ widthBreakpoints.large }px )`,
    xlarge: `screen and ( min-width: ${ widthBreakpoints.xlarge }px )`,
    /**
     * Let's you specify a specifc value where the main 
     * breakpoint don't fit.
     * 
     * @param {integer} value The breakpoint value
     */
    as: value => `screen and ( min-width: ${ value }px )`
}

const maxWidth = {
    small: `screen and ( max-width: ${ widthBreakpoints.small }px )`,
    medium: `screen and ( max-width: ${ widthBreakpoints.medium }px )`,
    large: `screen and ( max-width: ${ widthBreakpoints.large }px )`,
    xlarge: `screen and ( max-width: ${ widthBreakpoints.xlarge }px )`,
    /**
     * Let's you specify a specifc value where the main 
     * breakpoint don't fit.
     * 
     * @param {integer} value The breakpoint value
     */
    as: value => `screen and ( max-width: ${ value }px )`
}


/**
 * Color schemes
 */
const darkMode = `( prefers-color-scheme: dark )`
const lightMode = `( prefers-color-scheme: light )`

const colorScheme = {
    dark: darkMode,
    light: lightMode
}

const reducedMotion = `( prefers-reduced-motion )`


export { widthBreakpoints, minWidth, maxWidth, colorScheme, darkMode, lightMode, reducedMotion, minWidthFN }
