import styled from 'styled-components';

import { textOverflow } from '@styles/mixins';
import { breakpoints, colors, fonts, shadows } from '@styles/variables';

export const CardWrapper = styled.div`
  min-width: 120px;
  width: 100%;
  padding: 12px 16px;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 10px;
  background-color: white;

  filter: opacity(1);
  box-shadow: ${shadows.black};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${shadows.blackHover};
    cursor: pointer;
  }

  @media (max-width: ${breakpoints.mobile}) {
    min-width: 90px;
    padding: 8px 12px;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  max-height: 110px;
  margin-bottom: 8px;

  @media (max-width: ${breakpoints.mobile}) {
    max-height: 70px;
    margin-bottom: 5px;
  }
`;

export const CardInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 4px;
  }
`;

export const RecipeName = styled.div`
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.03em;

  color: ${colors.textBlack};

  ${textOverflow()};
`;

export const Ingredients = styled.div`
  font-weight: 400;
  font-size: 12px;
  letter-spacing: -0.03em;

  flex-grow: 1;

  color: ${colors.textGrey};
  opacity: 0.5;

  ${textOverflow(2)};

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 10px;
  }
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

  color: ${colors.red};

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
  }
`;
