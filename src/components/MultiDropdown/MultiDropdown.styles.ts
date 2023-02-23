import styled, { css } from 'styled-components';

import { colors, gradients, rgbColors } from '@styles/variables';

export const DropdownWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const commonButtonOptionStyles = css`
  width: 100%;
  padding: 10px;

  font-weight: 400;
  font-size: 12px;

  line-height: 16px;
  letter-spacing: 0.01em;
  text-align: left;

  cursor: pointer;
`;

export const DropdownButton = styled.input`
  ${commonButtonOptionStyles}

  display: block;
  margin-bottom: 3px;

  color: ${colors.black};

  border: none;
  background: ${gradients.lightRed};
  border-radius: 7px;

  &:disabled {
    color: rgba(${rgbColors.textGrey}, 0.5);
    background: ${gradients.grey};

    pointer-events: none;
    cursor: default;
  }

  &::placeholder {
    color: rgba(${rgbColors.textGrey}, 0.5);
  }
`;

export const DropdownMenu = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: absolute;
  width: 100%;

  background-color: ${colors.lightPink};
  border-radius: 7px;
  z-index: 100;
`;

export const DropdownOption = styled.div<{ selected: boolean }>`
  ${commonButtonOptionStyles}

  color: ${colors.black};

  &:first-child {
    border-radius: 7px 7px 0 0;
  }
  &:last-child {
    border-radius: 0 0 7px 7px;
  }

  background-color: ${({ selected }) => (selected ? colors.pink : 'transparent')};
`;
