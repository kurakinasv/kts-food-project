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

export const textOverflow = (lines = 1) => {
  if (lines === 1) {
    return css`
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    `;
  }
  return css`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  `;
};
