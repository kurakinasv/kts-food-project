import React, { FC, memo, useCallback } from 'react';

import { useNavigate } from 'react-router';

import { RouterPaths } from '@app/Router';
import { DishWithNutritionModel } from '@stores/DishStore';

import { CardsWrapper } from './RecipeCardsList.styles';
import RecipeCard from '../RecipeCard';
import CardSkeleton from '../RecipeCard/CardSkeleton';

type RecipeCardsProps = {
  loading: boolean;
  recipes?: DishWithNutritionModel[];
  loadItemsAmount?: number;
};

const RecipeCardsList: FC<RecipeCardsProps> = ({ loading, recipes, loadItemsAmount = 5 }) => {
  const navigate = useNavigate();

  const redirect = useCallback(
    (id: number) => () => {
      const path = RouterPaths.recipe.split(':')[0];
      navigate(`${path}${id}`);
    },
    []
  );

  if (loading || !recipes) {
    return (
      <CardsWrapper>
        {Array(loadItemsAmount)
          .fill(<CardSkeleton />)
          .map((item, i) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
      </CardsWrapper>
    );
  }

  return (
    <CardsWrapper>
      {recipes.map((dish, index) => (
        <RecipeCard
          id={dish.id}
          key={'' + dish.id + index}
          image={dish.image}
          title={dish.title}
          ingredients={dish.ingredients.join(' + ')}
          calories={Math.round(dish.calories)}
          onClick={redirect(dish.id)}
        />
      ))}
    </CardsWrapper>
  );
};

export default memo(RecipeCardsList);
