import { css, keyframes } from 'styled-components';

type SkeletonColors = 'grey' | 'red' | 'white';

type SceletonBg = Record<SkeletonColors, { from: string; to: string }>;

const sceletonBg: SceletonBg = {
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

const getSkeletonKeyframes = (color: SkeletonColors = 'grey') => keyframes`
  0% {
    background-color: ${sceletonBg[color].from};
  }
  100% {
    background-color: ${sceletonBg[color].to};
  }
`;

export const skeletonAnimation = (bgColor?: SkeletonColors) => css`
  animation: 1s linear infinite alternate ${getSkeletonKeyframes(bgColor)};
`;
