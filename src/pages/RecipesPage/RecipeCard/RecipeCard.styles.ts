import styled from 'styled-components';

import { colors, fonts, shadows } from '@styles/variables';

export const CardWrapper = styled.div`
  min-width: 90px;
  width: 100%;
  max-width: 200px;
  padding: 8px 12px;

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
`;

export const CardImage = styled.img`
  width: 100%;
  max-height: 70px;
  margin-bottom: 5px;
`;

export const CardInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const RecipeName = styled.div`
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.03em;

  color: ${colors.textBlack};

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Ingredients = styled.div`
  font-weight: 400;
  font-size: 12px;
  letter-spacing: -0.03em;

  color: ${colors.textGrey};

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  opacity: 0.5;
  cursor: text;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Calories = styled.span`
  font-family: ${fonts.secondary};
  font-weight: 700;
  font-size: 14px;

  color: ${colors.red};
`;
