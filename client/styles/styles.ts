import { createGlobalStyle, css } from 'styled-components'

export enum Colors {
  brandBackground = '#14142B',
  brandPrimary = '#DCE7E7',
  brandSecondary = '#1EECA3',
  brandTertiary = '#D7DEDE',
  brandPrimaryLight = '#F1F6F6',
  brandBorder = '#cce4f3',
  black = '#202227'
}

export enum Breakpoints {
  minTablet = 'min-width: 768px',
  minDesktop = 'min-width: 992px',
  minWideDesktop = 'min-width: 1200px'
}

const modernReset = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  ul[class]:not(.sbdocs),
  ol[class]:not(.sbdocs) {
    padding: 0;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  p,
  ul[class]:not(.sbdocs),
  ol[class]:not(.sbdocs),
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  body {
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
  }

  ul[class]:not(.sbdocs),
  ol[class]:not(.sbdocs) {
    list-style: none;
  }
`

export const GlobalStyle = createGlobalStyle`


  ${modernReset};
  
  html {
    font-family: 'Roboto';
    /* Set font size to 62.5% so 1rem = 10px in most browsers */
    font-size: 62.5%;
    line-height: 1.42857143;
    color: white;
    background-color: white;
    /* avoid layout jumping, because of scroll bars */
    /* but only on bigger screens to avoid non-centered content */
    /* https://stackoverflow.com/a/44000322/1337972 */
    @media (${Breakpoints.minTablet}) {
      width: 100vw;
      overflow-x: hidden;
    }
  }

  body {
    font-size: 1.5rem;
  }

`
