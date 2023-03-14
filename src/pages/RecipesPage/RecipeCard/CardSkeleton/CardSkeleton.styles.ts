import styled from 'styled-components';

import { skeletonAnimation } from '@styles/skeleton';
import { breakpoints } from '@styles/variables';

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

  @media (max-width: ${breakpoints.mobile}) {
    min-width: 90px;
    padding: 8px 12px;
  }
`;

export const CardImage = styled.div`
  width: 100%;
  height: 110px;
  margin-bottom: 8px;

  border-radius: 7px;
  ${skeletonAnimation()};

  @media (max-width: ${breakpoints.mobile}) {
    max-height: 70px;
    margin-bottom: 5px;
  }
`;

export const CardInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 4px;
  }
`;

export const RecipeName = styled.div`
  width: 100%;
  height: 25px;

  border-radius: 4px;
  ${skeletonAnimation()};
`;

export const Ingredients = styled.div`
  width: 100%;
  height: 54px;

  border-radius: 4px;
  opacity: 0.5;
  ${skeletonAnimation()};

  @media (max-width: ${breakpoints.mobile}) {
    height: 38px;
  }
`;
