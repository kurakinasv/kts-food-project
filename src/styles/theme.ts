import patternDark from '@static/images/bg-pattern-dark.png';
import pattern from '@static/images/bg-pattern.png';

import { skeletonBg, skeletonBgDark } from './skeleton';
import {
  colors,
  colorsDark,
  gradients,
  gradientsDark,
  rgbColors,
  rgbColorsDark,
  shadows,
  shadowsDark,
} from './variables';

export const light = {
  backgroundColor: '#fff',
  colors: colors,
  rgbColors: rgbColors,
  gradients: gradients,
  shadows: shadows,
  pattern: pattern,
  skeletonBg: skeletonBg,
};

export const dark = {
  backgroundColor: '#1b1b1b',
  colors: colorsDark,
  rgbColors: rgbColorsDark,
  gradients: gradientsDark,
  shadows: shadowsDark,
  pattern: patternDark,
  skeletonBg: skeletonBgDark,
};
