import { FC } from 'react';

import { CardImage, CardInfo, CardWrapper, Ingredients, RecipeName } from './CardSkeleton.styles';

const CardSkeleton: FC = () => {
  return (
    <CardWrapper>
      <CardImage />
      <CardInfo>
        <RecipeName />
        <Ingredients />
      </CardInfo>
    </CardWrapper>
  );
};

export default CardSkeleton;
