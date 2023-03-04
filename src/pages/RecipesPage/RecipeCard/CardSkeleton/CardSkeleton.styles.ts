import styled from 'styled-components';

import { skeletonAnimation } from '@styles/skeleton';
import { shadows } from '@styles/variables';

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
`;

export const CardImage = styled.div`
  width: 100%;
  height: 70px;
  margin-bottom: 6px;

  border-radius: 7px;
  ${skeletonAnimation()};
`;

export const CardInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const RecipeName = styled.div`
  width: 100%;
  height: 25px;

  border-radius: 4px;
  ${skeletonAnimation()};
`;

export const Ingredients = styled.div`
  width: 100%;
  height: 32px;

  border-radius: 4px;
  opacity: 0.5;
  ${skeletonAnimation()};
`;
