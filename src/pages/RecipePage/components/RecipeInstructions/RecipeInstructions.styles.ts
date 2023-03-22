import styled from 'styled-components';

import { breakpoints, fonts } from '@styles/variables';

export const InstructionsWrapper = styled.div`
  font-size: 12px;
  font-weight: 500;

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
    color: ${({ theme }) => theme.colors.textBlack};

    &::marker {
      font-family: ${fonts.secondary};
      font-size: 1.5em;
      color: rgba(${({ theme }) => theme.rgbColors.red}, 0.5);
    }
  }
`;
