import React, { useCallback } from 'react';

import { observer } from 'mobx-react-lite';
import { useTheme } from 'styled-components';

import Alert, { useAlert } from '@components/Alert';
import { PlusIcon, XMarkIcon } from '@static/icons';
import { useCollectionStore } from '@stores/RootStore';
import { UniqueId } from '@typings/common';
import { replaceImage } from '@utils/replaceImage';

import {
  CardFooter,
  CardImage,
  CardInfo,
  Ingredients,
  RecipeName,
  CardWrapper,
  Calories,
  ImageWrapper,
  StyledButton,
} from './RecipeCard.styles';

export type CardProps = {
  id: UniqueId;
  image: string;
  title: React.ReactNode;
  ingredients: string;
  calories: number;
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

const RecipeCard: React.FC<CardProps> = ({ id, image, title, ingredients, calories, onClick }) => {
  const { colors } = useTheme();

  const { isOpen, openAlert } = useAlert();

  const { addToCollection, isRecipeExistInCollection } = useCollectionStore();

  const addButtonHandler = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    addToCollection(id);
    openAlert();
  }, []);

  return (
    <>
      <Alert
        message={isRecipeExistInCollection(id) ? 'Added to collection' : 'Removed from collection'}
        status="success"
        open={isOpen}
      />

      <CardWrapper onClick={onClick}>
        <ImageWrapper>
          <CardImage src={image} alt="dish serving" onError={replaceImage} />
        </ImageWrapper>

        <CardInfo>
          <RecipeName>{title}</RecipeName>
          <Ingredients>{ingredients}</Ingredients>

          <CardFooter>
            <Calories>{calories} kcal</Calories>
            <StyledButton
              onClick={addButtonHandler}
              icon={
                isRecipeExistInCollection(id) ? (
                  <XMarkIcon fillColor={colors.white} />
                ) : (
                  <PlusIcon />
                )
              }
            />
          </CardFooter>
        </CardInfo>
      </CardWrapper>
    </>
  );
};

export default observer(RecipeCard);
