import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  @font-face {
    font-family: 'Fira Mono';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/firamono/v12/N0bX2SlFPv1weGeLZDtgJv7S.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  html {
    background: white;
    background: ${p => p.theme.background};
    background-attachment: fixed;
    min-height: 100vh;
  }
  body {
    margin: 0;
    font-family: ${p => p.theme.font};
    font-size: 14px;
    color: ${p => p.theme.text};
    letter-spacing: 0.02em;
  }
  h1, h2, h3, h4, b {
    font-family: ${p => p.theme.displayFont};
    color: ${p => p.theme.displayText};
    font-weight: 600;
    margin: .4em 0;
  }
  h1 {
    text-transform: uppercase;

    span {
      color: #0B7332;
    }
  }
  p {
    margin: 0.3em 0;
  }
  code {
    font-family: 'Fira Mono', monospace;
    font-size: 0.9em;
  }
  a {
    text-decoration: none;
    color: ${(p) => p.theme.primary};
    transition: all 50ms ease-in-out;
    &:hover {
      color: ${(p) => p.theme.primaryHover};
    }
  }
`