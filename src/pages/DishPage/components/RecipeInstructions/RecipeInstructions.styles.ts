import styled from 'styled-components';

import { breakpoints, fonts, rgbColors } from '@styles/variables';

export const InstructionsWrapper = styled.div`
  font-size: 12px;
  font-weight: 500;

  & > h3 {
    margin-bottom: 8px;
    padding: 2px 5px;

    font-size: 1.2em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: white;

    background-color: rgba(${rgbColors.red}, 0.4);
  }

  @media (min-width: ${breakpoints.mobile}) {
    font-size: 16px;
  }

  & p {
    font-weight: 600;
  }
`;

export const RecipeSteps = styled.ol`
  padding-left: 5px;

  & li {
    list-style: decimal-leading-zero;
    margin-bottom: 8px;

    &::marker {
      font-family: ${fonts.secondary};
      font-size: 1.5em;
      color: rgba(${rgbColors.red}, 0.5);
    }
  }
`;
