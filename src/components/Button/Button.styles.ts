import styled, { css } from 'styled-components';

import Loader from '@components/Loader';
import { getButtonSizes } from '@styles/mixins';
import { colors, rgbColors } from '@styles/variables';

import { StyledProps } from './Button';

export const ButtonWrapper = styled.button<StyledProps>`
  min-width: ${({ minWidth }) => (minWidth ? minWidth : '36px')};
  padding: ${({ padding }) => (padding ? padding : '8px 14px')};

  ${({ width, height, shape }) => getButtonSizes(width, height, shape)}

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  text-align: center;

  ${({ bgColor, theme }) =>
    bgColor === 'transparent'
      ? css`
          background-color: rgba(${({ theme }) => theme.rgbColors.red}, 0.1);
          color: ${theme.colors.red};
        `
      : bgColor === 'solid'
      ? css`
          background-color: ${theme.colors.red};
          color: ${theme.colors.white};
        `
      : css`
          background-color: 'transparent';
          color: ${theme.colors.red};
        `}

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
