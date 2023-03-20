import { colors } from '@react-spring/shared';
import { animated } from '@react-spring/web';
import styled from 'styled-components';

import { skeletonAnimation } from '@styles/skeleton';
import { breakpoints, fonts, shadows } from '@styles/variables';

export const DishPhotoSkeleton = styled.div`
  width: 100%;
  aspect-ratio: 9/16;
  ${skeletonAnimation('red')};

  @media (min-width: ${breakpoints.mobile}) {
    width: 90%;
    max-height: 430px;
    border-radius: 16px;
    margin-bottom: 40px;
    aspect-ratio: 3/2;
    ${skeletonAnimation('white')};

    box-shadow: ${({ theme }) => theme.shadows.black};
  }

  @media (max-width: 550px) {
    width: auto;
    object-fit: contain;
  }
`;

export const NutrientSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  user-select: none;
`;

export const StyledNumber = styled(animated.div)`
  display: inline-block;

  &,
  & + span {
    font-family: inherit;
    font-weight: 600;
    font-size: 66px;
    font-family: ${fonts.secondary};
    color: ${({ theme }) => theme.colors.red};
    opacity: 0.3;

    @media (max-width: ${breakpoints.desktop}) {
      font-size: 58px;
    }
  }
`;

export const NutrientNameSkeleton = styled.div`
  width: 85px;
  height: 18px;
  ${skeletonAnimation('red')}
`;

export const NameSkeleton = styled.div`
  max-width: 370px;
  height: 36px;
  margin-bottom: 26px;

  border-radius: 7px;
  ${skeletonAnimation('red')}

  @media (min-width: ${breakpoints.mobile}) {
    height: 46px;
    max-width: 600px;
    margin-bottom: 16px;
  }
`;

export const StatsSkeleton = styled.div`
  max-width: 300px;
  height: 25px;
  margin-bottom: 25px;

  border-radius: 4px;
  opacity: 0.3;
  ${skeletonAnimation('red')};

  @media (min-width: ${breakpoints.mobile}) {
    margin-bottom: 35px;
  }
`;

export const DescriptionSkeleton = styled.div`
  max-width: 750px;
  height: 170px;
  border-radius: 7px;
  opacity: 0.3;
  ${skeletonAnimation('red')};

  @media (min-width: ${breakpoints.mobile}) {
    height: 300px;
  }
`;
