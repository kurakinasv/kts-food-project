import styled, { css } from 'styled-components';

import { textOverflow } from '@styles/mixins';
import { breakpoints, colors, gradients, rgbColors } from '@styles/variables';

export const DropdownWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const commonButtonOptionStyles = css`
  width: 100%;
  padding: 10px 16px 10px 10px;

  font-weight: 400;
  font-size: 12px;

  line-height: 16px;
  letter-spacing: 0.01em;
  text-align: left;

  cursor: pointer;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px 26px 10px 10px;
  }
`;

export const DropdownButton = styled.input<{ isEmpty: boolean }>`
  ${commonButtonOptionStyles}

  display: block;

  color: ${({ isEmpty }) => (isEmpty ? `rgba(${rgbColors.textGrey}, 0.5)` : colors.black)};

  border: none;
  background: ${gradients.lightRed};
  border-radius: 7px;

  ${textOverflow()};

  &:disabled {
    color: rgba(${rgbColors.textGrey}, 0.5);
    background: ${gradients.grey};

    pointer-events: none;
    cursor: default;
  }
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translate3d(0, -50%, 0);
`;

export const DropdownMenu = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  margin-top: 3px;
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
