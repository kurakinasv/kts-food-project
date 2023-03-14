import styled from 'styled-components';

import { breakpoints, colors, gradients, rgbColors } from '@styles/variables';

export const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 15px;

  font-weight: 400;
  font-size: 15px;

  line-height: 16px;
  letter-spacing: 0.01em;

  color: ${({ theme }) => theme.colors.black};

  background: ${({ theme }) => theme.gradients.lightRed};
  border-radius: 7px;
  border: none;
  // to remove background transparency
  backdrop-filter: opacity(1);

  &::placeholder {
    font-family: inherit;
    color: rgba(${({ theme }) => theme.rgbColors.textGrey}, 0.5);

    user-select: none;
  }

  &:focus {
    background: ${({ theme }) => theme.gradients.red};
    outline: none;
  }

  &:disabled {
    color: rgba(${({ theme }) => theme.rgbColors.textGrey}, 0.5);
    background: ${({ theme }) => theme.gradients.grey};

    pointer-events: none;
    cursor: default;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
    padding: 10px;
  }
`;

export const ClearButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translate3d(0, -50%, 0);
`;
