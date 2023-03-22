// eslint-disable-next-line import/named
import { css, DefaultTheme, keyframes } from 'styled-components';

type SkeletonColors = 'grey' | 'red' | 'white';

export type SkeletonBg = Record<SkeletonColors, { from: string; to: string }>;

export const skeletonBg: SkeletonBg = {
  grey: {
    from: 'hsl(0, 3%, 85%)',
    to: 'hsl(0, 7%, 96%)',
  },
  red: {
    from: 'hsl(0, 100%, 90%)',
    to: 'hsl(0, 100%, 96%)',
  },
  white: {
    from: 'hsl(0, 100%, 100%)',
    to: 'hsl(0, 90%, 98%)',
  },
};

export const skeletonBgDark: SkeletonBg = {
  grey: {
    from: 'hsl(0, 2%, 43%)',
    to: 'hsl(0, 5%, 57%)',
  },
  red: {
    from: 'hsl(0, 18%, 53%)',
    to: 'hsl(0, 16%, 48%)',
  },
  white: {
    from: 'hsl(0, 2%, 28%)',
    to: 'hsl(0, 2%, 22%)',
  },
};

const getSkeletonKeyframes = (color: SkeletonColors = 'grey', theme: DefaultTheme) => keyframes`
  0% {
    background-color: ${theme.skeletonBg[color].from};
  }
  100% {
    background-color: ${theme.skeletonBg[color].to};
  }
`;

export const skeletonAnimation = (theme: DefaultTheme, bgColor?: SkeletonColors) => css`
  animation: 1s linear infinite alternate ${getSkeletonKeyframes(bgColor, theme)};
`;
