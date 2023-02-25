import { css } from 'styled-components';

import { ButtonShape } from './types';

export const square = (size: string) => css`
  width: ${size};
  height: ${size};
`;

export const getButtonSizes = (width = '', height = '36px', shape: ButtonShape = 'none') => {
  if (shape !== 'none' || width === height) {
    return square(width);
  }

  return css`
    width: ${width};
    height: ${height};
  `;
};
