import styled from 'styled-components';

import { square } from '@styles/mixins';

const diceHeight = '30px';

export const Wrapper = styled.span`
  display: inline-block;
  height: ${diceHeight};
  position: relative;

  & > svg {
    display: inline-block;
    ${square(diceHeight)};
  }

  // animating back dice on icon hover
  &:hover > svg:last-of-type {
    transform: translate3d(10px, -6px, 0) rotate(-135deg);
    opacity: 0.5;
  }
`;

export const BackDice = styled.svg`
  position: absolute;
  top: 0;
  left: -${diceHeight};

  opacity: 0;
  transform: translate3d(${diceHeight}, 0, 0) rotate(-90deg);
  transition: all 0.2s ease-in;
`;

export const LoaderWrapper = styled.span`
  display: flex;
  align-items: center;
  ${square(diceHeight)};
`;
