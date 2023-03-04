import React, { memo } from 'react';

import Button from '@components/Button';
import { PlusIcon } from '@static/icons';
import { replaceImage } from '@utils/replaceImage';

import {
  CardFooter,
  CardImage,
  CardInfo,
  Ingredients,
  RecipeName,
  CardWrapper,
  Calories,
} from './RecipeCard.styles';

export type CardProps = {
  image: string;
  title: React.ReactNode;
  ingredients: string;
  calories: number;
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

const RecipeCard: React.FC<CardProps> = ({ image, title, ingredients, calories, onClick }) => {
  return (
    <CardWrapper onClick={onClick}>
      <div>
        <CardImage src={image} alt="dish serving" onError={replaceImage} />
      </div>
      <CardInfo>
        <RecipeName>{title}</RecipeName>
        <Ingredients>{ingredients}</Ingredients>

        <CardFooter>
          <Calories>{calories} kcal</Calories>
          <Button icon={<PlusIcon />} shape="circle" width="24px" padding="0" minWidth="24px" />
        </CardFooter>
      </CardInfo>
    </CardWrapper>
  );
};

export default memo(RecipeCard);
