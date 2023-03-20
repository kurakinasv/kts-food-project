import { LoaderSize } from '@components/Loader';

import { ButtonWrapper, StyledLoader } from './Button.styles';
import { StyledButtonProps } from './types';

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  icon?: React.ReactNode;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  StyledButtonProps;

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  loading = false,
  disabled = false,
  className = '',
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
