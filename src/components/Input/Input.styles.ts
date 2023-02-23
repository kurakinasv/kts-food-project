import styled from 'styled-components';

import { colors, gradients, rgbColors } from '@styles/variables';

export const InputWrapper = styled.input`
  width: 100%;
  padding: 10px;

  font-weight: 400;
  font-size: 12px;

  line-height: 16px;
  letter-spacing: 0.01em;

  color: ${colors.black};

  background: ${gradients.lightRed};
  border-radius: 7px;
  border: none;

  &::placeholder {
    font-family: inherit;
    color: rgba(${rgbColors.textGrey}, 0.5);

    user-select: none;
  }

  &:focus {
    background: ${gradients.red};
    outline: none;
  }

  &:disabled {
    color: rgba(${rgbColors.textGrey}, 0.5);
    background: ${gradients.grey};

    pointer-events: none;
    cursor: default;
  }
`;
