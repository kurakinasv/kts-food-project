export type BackgroundTypes = 'solid' | 'transparent' | 'none';

export type ButtonShape = 'circle' | 'square' | 'none';

export type StyledButtonProps = {
  width?: string;
  height?: string;
  minWidth?: string;
  padding?: string;
  bgColor?: BackgroundTypes;
  shape?: ButtonShape;
};
