import styled, { css } from 'styled-components';

import Button from '@components/Button';
import { mobileMedia, square, textOverflow } from '@styles/mixins';

export const CardWrapper = styled.div`
  width: 100%;
  padding: 18px 30px;

  display: flex;
  align-items: center;
  gap: 8px;

  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};

  box-shadow: ${({ theme }) => theme.shadows.black};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.blackHover};
    cursor: pointer;
  }

  ${mobileMedia({ padding: '12px 16px' })};
`;

export const RecipeInfo = styled.div`
  height: 100%;
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const RecipeName = styled.h4`
  flex-grow: 1;

  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.03em;

  color: ${({ theme }) => theme.colors.textBlack};

  ${textOverflow(2)};

  ${mobileMedia({ ['font-size']: '14px' })};
`;

export const Tags = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Tag = styled.div<{ color: 'purple' | 'blue' | 'red' }>`
  padding: 2px 8px;
  font-size: 14px;
  border-radius: 20px;

  ${({ color, theme }) => css`
    color: ${theme.colors[color]};
    border: 1px solid ${theme.colors[color]};
    background-color: rgba(${theme.rgbColors[color]}, 0.1);
  `}

  ${mobileMedia({ ['font-size']: '11px' })};
`;

export const StyledButton = styled(Button).attrs({
  shape: 'circle',
  padding: '6px',
  minWidth: '36px',
  width: '36px',
})`
  & > svg {
    ${square('100%')}
  }
`;
