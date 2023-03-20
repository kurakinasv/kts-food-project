// eslint-disable-next-line import/named
import { css, FlattenSimpleInterpolation } from 'styled-components';

import { breakpoints } from './variables';

export const square = (size: string) => css`
  width: ${size};
  height: ${size};
`;

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

export const scrollbar = (width?: string) => css`
  &::-webkit-scrollbar {
    width: ${width};
    background-color: ${({ theme }) => theme.colors.pink};
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(${({ theme }) => theme.rgbColors.red}, 0.1);

    &:hover {
      background-color: rgba(${({ theme }) => theme.rgbColors.red}, 0.2);
    }
  }
`;

export const mobileMedia = (
  styles: Record<string, string> | string | FlattenSimpleInterpolation
) => css`
  @media (max-width: ${breakpoints.mobile}) {
    ${styles}
  }
`;

export const desktopMedia = (
  styles: Record<string, string> | string | FlattenSimpleInterpolation
) => css`
  @media (max-width: ${breakpoints.desktop}) {
    ${styles}
  }
`;
