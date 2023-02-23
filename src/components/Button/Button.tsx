import { LoaderSize } from '@components/Loader';

import { ButtonWrapper, StyledLoader } from './Button.styles';

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  disabled = false,
  className = '',
  ...attrs
}: ButtonProps) => {
  return (
    <ButtonWrapper disabled={disabled || loading} className={className} {...attrs}>
      {loading && <StyledLoader size={LoaderSize.s} />}
      {children}
    </ButtonWrapper>
  );
};

export default Button;
