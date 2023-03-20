import React, { FC, memo } from 'react';

import { useSpring, config } from '@react-spring/web';

import { getRandomInteger } from '@utils/getRandomInteger';

import {
  StyledNumber,
  DishPhotoSkeleton,
  NutrientNameSkeleton,
  NameSkeleton,
  StatsSkeleton,
  DescriptionSkeleton,
} from './RecipePageSkeleton.styles';
import { PhotoWrapper, Nutrition, Nutrient, RecipeInfo } from '../../RecipePage.styles';

type RecipePageSkeletonProps = {
  loading: boolean;
};

export const AnimatedNumber: FC = () => {
  const { number } = useSpring({
    from: { number: getRandomInteger(80) },
    to: [
      { number: getRandomInteger(60) },
      { number: getRandomInteger(30) },
      { number: getRandomInteger(100) },
    ],
    loop: true,
    config: { ...config.gentle },
  });

  return <StyledNumber>{number.to((n) => Math.abs(Math.floor(n)))}</StyledNumber>;
};

const RecipePageSkeleton: FC<RecipePageSkeletonProps> = ({ loading }) => {
  if (!loading) {
    return null;
  }

  const nutrients = Array(3).fill(
    <Nutrient>
      <div>
        <AnimatedNumber />
        <span>g</span>
      </div>
      <NutrientNameSkeleton />
    </Nutrient>
  );

  return (
    <>
      <PhotoWrapper>
        <DishPhotoSkeleton />

        <Nutrition>
          {nutrients.map((item, i) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </Nutrition>
      </PhotoWrapper>

      <RecipeInfo>
        <NameSkeleton />
        <StatsSkeleton />
        <DescriptionSkeleton />
      </RecipeInfo>
    </>
  );
};

export default memo(RecipePageSkeleton);
