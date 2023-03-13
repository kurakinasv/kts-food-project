import React from 'react';

import { observer } from 'mobx-react-lite';

import Alert, { useAlert } from '@components/Alert';
import Button from '@components/Button';
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
  const { isOpen, openAlert } = useAlert();

  const { addToCollection, isDishExistInCollection } = useCollectionStore();

  const addButtonHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCollection(id);
    openAlert();
  };

  return (
    <>
      <Alert
        message={isDishExistInCollection(id) ? 'Added to collection' : 'Removed from collection'}
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
            <Button
              onClick={addButtonHandler}
              icon={isDishExistInCollection(id) ? <XMarkIcon fillColor="white" /> : <PlusIcon />}
              shape="circle"
              width="24px"
              padding="0"
              minWidth="24px"
            />
          </CardFooter>
        </CardInfo>
      </CardWrapper>
    </>
  );
};

export default observer(RecipeCard);
