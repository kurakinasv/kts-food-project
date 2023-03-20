import styled from 'styled-components';

import Loader from '@components/Loader';

import { StyledButtonProps } from './types';
import { bgColorStyles, getButtonSizes } from './utils';

export const ButtonWrapper = styled.button<StyledButtonProps>`
  min-width: ${({ minWidth }) => minWidth || '36px'};
  padding: ${({ padding }) => padding || '8px 14px'};

  ${({ width, height, shape }) => getButtonSizes(width, height, shape)}

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  text-align: center;

  ${({ bgColor, theme }) => !!bgColor && bgColorStyles(theme)[bgColor]};

  border: none;
  border-radius: ${({ shape }) => (shape === 'circle' ? '50%' : '7px')};

  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.5)};
    cursor: pointer;
  }

  &:disabled {
    background-color: ${({ bgColor, theme }) =>
      bgColor === 'solid' || bgColor === 'transparent' ? theme.colors.grey : 'transparent'};

    pointer-events: none;
    user-select: none;
    cursor: default;
  }
`;

export const StyledLoader = styled(Loader)`
  border: 3px solid ${({ theme }) => theme.colors.white};
  border-right: 3px solid transparent;
`;
