import { SkeletonBg } from '@styles/skeleton';
import { ImageURL } from '@typings/common';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    backgroundColor: string;
    colors: Record<string, string>;
    rgbColors: Record<string, string>;
    gradients: Record<string, string>;
    shadows: Record<string, string>;
    pattern: ImageURL;
    skeletonBg: SkeletonBg;
  }
}
