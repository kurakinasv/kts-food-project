// eslint-disable-next-line import/named
import { css, DefaultTheme } from 'styled-components';

import { square } from '@styles/mixins';

import { ButtonShape } from './types';

export const bgColorStyles = (theme: DefaultTheme) => {
  return {
    transparent: css`
      background-color: rgba(${theme.rgbColors.red}, 0.1);
      color: ${theme.colors.red};
    `,
    solid: css`
      background-color: ${theme.colors.red};
      color: ${theme.colors.white};
    `,
    none: css`
      background-color: 'transparent';
      color: ${theme.colors.red};
    `,
  };
};

export const getButtonSizes = (width = '', height = '36px', shape: ButtonShape = 'none') => {
  if (shape !== 'none' || width === height) {
    return square(width);
  }

  return css`
    width: ${width};
    height: ${height};
  `;
};
