import { LoaderSize } from '@components/Loader';
import { ButtonShape } from '@styles/types';

import { ButtonWrapper, StyledLoader } from './Button.styles';

export type StyledProps = {
  width?: string;
  height?: string;
  minWidth?: string;
  padding?: string;
  bgColor?: 'solid' | 'transparent';
  shape?: ButtonShape;
};

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  icon?: JSX.Element;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  StyledProps;

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  disabled = false,
  className = '',
  icon = undefined,
  bgColor = 'solid',
  shape = 'none',
  ...attrs
}: ButtonProps) => {
  return (
    <ButtonWrapper
      disabled={disabled || loading}
      className={className}
      bgColor={bgColor}
      shape={shape}
      {...attrs}
    >
      {loading && <StyledLoader size={LoaderSize.s} />}
      {!!icon && !loading && <>{icon}</>}
      {children}
    </ButtonWrapper>
  );
};

export default Button;
