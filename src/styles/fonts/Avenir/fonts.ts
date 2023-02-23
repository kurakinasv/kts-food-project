import { css } from 'styled-components';

import AvenirBookEot from './Avenir-Book.eot';
import AvenirBookTtf from './Avenir-Book.ttf';
import AvenirBookWoff from './Avenir-Book.woff';
import AvenirBookWoff2 from './Avenir-Book.woff2';
import AvenirMediumEot from './Avenir-Medium.eot';
import AvenirMediumTtf from './Avenir-Medium.ttf';
import AvenirMediumWoff from './Avenir-Medium.woff';
import AvenirMediumWoff2 from './Avenir-Medium.woff2';
import AvenirRomanEot from './Avenir-Roman.eot';
import AvenirRomanTtf from './Avenir-Roman.ttf';
import AvenirRomanWoff from './Avenir-Roman.woff';
import AvenirRomanWoff2 from './Avenir-Roman.woff2';

const AvenirFont = css`
  @font-face {
    font-family: 'Avenir';
    src: url('Avenir-Roman.eot');
    src: local('Avenir Roman'), local('Avenir-Roman'),
      url(${AvenirRomanEot}) format('embedded-opentype'), url(${AvenirRomanWoff2}) format('woff2'),
      url(${AvenirRomanWoff}) format('woff'), url(${AvenirRomanTtf}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Avenir Book';
    src: url('Avenir-Book.eot');
    src: local('Avenir Book'), local('Avenir-Book'),
      url(${AvenirBookEot}) format('embedded-opentype'), url(${AvenirBookWoff2}) format('woff2'),
      url(${AvenirBookWoff}) format('woff'), url(${AvenirBookTtf}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Avenir';
    src: url('Avenir-Medium.eot');
    src: local('Avenir Medium'), local('Avenir-Medium'),
      url(${AvenirMediumEot}) format('embedded-opentype'), url(${AvenirMediumWoff2}) format('woff2'),
      url(${AvenirMediumWoff}) format('woff'), url(${AvenirMediumTtf}) format('truetype');
    font-weight: 500;
    font-style: normal;
  }
`;

export default AvenirFont;
