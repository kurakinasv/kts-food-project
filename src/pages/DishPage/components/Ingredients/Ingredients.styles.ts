import styled from 'styled-components';

import { breakpoints, colors, rgbColors } from '@styles/variables';

export const IngredientsWrapper = styled.div`
  margin-bottom: 30px;

  font-size: 12px;
  font-weight: 500;

  @media (min-width: ${breakpoints.mobile}) {
    font-size: 16px;
  }
`;

export const IngredientsList = styled.ul`
  margin-top: 14px;
`;

export const IngredientItem = styled.li`
  padding: 8px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid rgba(${rgbColors.red}, 0.2);
`;

export const IngredientInfo = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;

  color: ${colors.textBlack};

  & > span {
    font-weight: 600;
    letter-spacing: 0.03em;
    color: ${colors.secondaryRed};
  }
`;
