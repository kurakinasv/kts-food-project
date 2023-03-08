import styled, { createGlobalStyle } from 'styled-components';

import pattern from '@static/images/bg-pattern.png';

import AvenirFont from './fonts/Avenir/fonts';
import DMSansFont from './fonts/DMSans/fonts';
import { colors, rgbColors } from './variables';

const GlobalStyle = createGlobalStyle`
  ${AvenirFont}
  ${DMSansFont}

  :root {
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  
    &::-webkit-scrollbar {
        background-color: ${colors.pink};
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(${rgbColors.red}, 0.1);

        &:hover{
          background-color: rgba(${rgbColors.red}, 0.2);
        }
    }
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

export const BackgroundImage = styled.div`
  width: 610px;
  min-height: 400px;

  position: fixed;
  top: 0;
  right: 0;

  background-image: url(${pattern});
  transform: translate3d(38%, -98%, 0) rotate(290deg);
  pointer-events: none;

  @media (max-width: 768px) {
    transform: translate3d(44%, -108%, 0) rotate(290deg);
  }
`;

export default GlobalStyle;
