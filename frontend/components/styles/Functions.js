/**
 * CSS-in-JS functions
 */
import { css } from "styled-components"
import { typography } from "./Variables"


const { baseFontSize, baseLineHeight } = typography

/**
 * CSS-in-JS Function: Get the baseline
 * 
 * @param {integer} multiplier 
 * @return {string} A fraction of the baseline in the rem unit
 */
const getBaseline = ( multiplier = 1 ) => {
    return `${baseFontSize * baseLineHeight * multiplier}rem`
}


/**
 * CSS-in-JS: provides the required properties for the ::before 
 * and ::after pseudo elements.
 * 
 * @param {string} position The position value
 * @return {css} A styled-component css template literal
 */
const pseudoRequired = ( position = 'absolute' ) => {
    return css`
        content: '';
        display: block;
        position: ${ position };
    `
}


export { getBaseline, pseudoRequired }
