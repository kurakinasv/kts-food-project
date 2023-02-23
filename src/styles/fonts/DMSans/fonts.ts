import { css } from 'styled-components';

import DMSansBoldEot from './DMSans-Bold.eot';
import DMSansBoldTtf from './DMSans-Bold.ttf';
import DMSansBoldWoff from './DMSans-Bold.woff';
import DMSansBoldWoff2 from './DMSans-Bold.woff2';

const DMSansFont = css`
  @font-face {
    font-family: 'DM Sans';
    src: url(${DMSansBoldEot}) format('embedded-opentype'), url(${DMSansBoldWoff2}) format('woff2'),
      url(${DMSansBoldWoff}) format('woff'), url(${DMSansBoldTtf}) format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
`;

export default DMSansFont;
