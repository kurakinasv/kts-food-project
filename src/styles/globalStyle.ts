import { createGlobalStyle } from 'styled-components';

import AvenirFont from './fonts/Avenir/fonts';
import DMSansFont from './fonts/DMSans/fonts';

const GlobalStyle = createGlobalStyle`
  ${AvenirFont}
  ${DMSansFont}

  :root {
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    outline: none;
    text-decoration: none;
    border: none;
    background-color: transparent;
  }

  html {
    width: 100%;
    scroll-behavior: smooth;
  }

  button, a {
    font-family: inherit;
    cursor: pointer;
  }

  ul, li, ol {
    list-style: none;
  }
`;

export default GlobalStyle;
