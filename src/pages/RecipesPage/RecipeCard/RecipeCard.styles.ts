import styled from 'styled-components';

import Button from '@components/Button';
import { mobileMedia, textOverflow } from '@styles/mixins';
import { fonts } from '@styles/variables';

export const CardWrapper = styled.div`
  min-width: 120px;
  width: 100%;
  padding: 12px 16px;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};

  filter: opacity(1);
  box-shadow: ${({ theme }) => theme.shadows.black};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.blackHover};
    cursor: pointer;
  }

  ${mobileMedia({
    ['min-width']: '90px',
    padding: '8px 12px',
  })};
`;

export const ImageWrapper = styled.div`
  margin-bottom: 8px;
`;

export const CardImage = styled.img`
  width: 100%;
  max-height: 110px;

  ${mobileMedia({
    ['max-height']: '70px',
    ['margin-bottom']: '5px',
  })};
`;

export const CardInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;

  ${mobileMedia({ gap: '4px' })};
`;

export const RecipeName = styled.div`
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.03em;

  color: ${({ theme }) => theme.colors.textBlack};

  ${textOverflow()};
`;

export const Ingredients = styled.div`
  font-weight: 400;
  font-size: 12px;
  letter-spacing: -0.03em;

  flex-grow: 1;

  color: ${({ theme }) => theme.colors.textGrey};
  opacity: 0.5;

  ${textOverflow(2)};

  ${mobileMedia({ ['font-size']: '10px' })};
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Calories = styled.span`
  font-family: ${fonts.secondary};
  font-weight: 700;
  font-size: 16px;

  color: ${({ theme }) => theme.colors.red};

  ${mobileMedia({ ['font-size']: '14px' })};
`;

export const StyledButton = styled(Button).attrs({
  shape: 'circle',
  width: '24px',
  padding: '0',
  minWidth: '24px',
})``;
