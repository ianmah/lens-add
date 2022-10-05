import React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
    primary: '#FF8A9F',
    primaryHover: '#FAAAAA',
    border: '#8300d0 2px solid',
    // background: 'linear-gradient(140deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 50%, rgba(76,13,113,1) 100%)',
    background: '#232428',
    lightBackground: '#eeeeee18',
    displayText: '#fff',
    text: '#FFBFBC',
    toastText: 'black',
    textLight: '#212322',
    greyed: '#747c90',
    error: '#FF3236',
    darken: '#000af8',
    darken2: '#000af8',
    font: `'Poppins', sans-serif`,
    displayFont: `'Space Grotesk', sans-serif`,
    hrefUnderline: `
    display: inline-block;
    &:after {
        content: '';
        display: block;
        margin: auto;
        height: 2px;
        width: 0px;
        background: transparent;
        transition: width 150ms ease, background-color 150ms ease;
    }
    &:hover:after {
        width: 100%;
        background: #FF9C7D;
    }
    `,
}

export default ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>