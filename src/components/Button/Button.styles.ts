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

  ${({ bgColor }) =>
    bgColor === 'transparent'
      ? css`
          background-color: rgba(${rgbColors.red}, 0.1);
          color: ${colors.red};
        `
      : bgColor === 'solid'
      ? css`
          background-color: ${colors.red};
          color: white;
        `
      : css`
          background-color: 'transparent';
          color: ${colors.red};
        `}

  border: none;
  border-radius: ${({ shape }) => (shape === 'circle' ? '50%' : '7px')};

  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.5)};
    cursor: pointer;
  }

  &:disabled {
    background-color: ${({ bgColor }) =>
      bgColor === 'solid' || bgColor === 'transparent' ? colors.grey : 'transparent'};

    pointer-events: none;
    user-select: none;
    cursor: default;
  }
`;

export const StyledLoader = styled(Loader)`
  border: 3px solid white;
  border-right: 3px solid transparent;
`;
