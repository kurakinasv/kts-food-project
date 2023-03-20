import styled from 'styled-components';

import Button from '@components/Button';
import { mobileMedia } from '@styles/mixins';
import { breakpoints } from '@styles/variables';

export const IngredientsWrapper = styled.div`
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

  border-bottom: 1px solid rgba(${({ theme }) => theme.rgbColors.red}, 0.2);

  ${mobileMedia({ padding: '6px 8px' })};
`;

export const IngredientInfo = styled.span`
  font-weight: 400;
  font-size: 16px;

  color: ${({ theme }) => theme.colors.textBlack};

  & > span {
    font-weight: 600;
    letter-spacing: 0.03em;
    color: ${({ theme }) => theme.colors.secondaryRed};
  }

  ${mobileMedia({ ['font-size']: '14px' })};
`;

export const StyledButton = styled(Button).attrs({
  shape: 'circle',
  width: '24px',
  minWidth: '24px',
  padding: '0',
})``;
