import { FC, useMemo } from 'react';

import { observer } from 'mobx-react-lite';
import { useTheme } from 'styled-components';

import { SectionTitle } from '@pages/RecipePage/RecipePage.styles';
import { XMarkIcon, PlusIcon } from '@static/icons';
import { ExtendedIngredientModel } from '@stores/models/ingredients';
import { useIngredientsListStore } from '@stores/RootStore';
import { getIngredientMeasuresString } from '@utils/getIngredientMeasuresString';

import {
  IngredientsWrapper,
  IngredientsList,
  IngredientItem,
  IngredientInfo,
  StyledButton,
} from './Ingredients.styles';

type IngredientsProps = {
  ingredients: ExtendedIngredientModel[];
};

const Ingredients: FC<IngredientsProps> = ({ ingredients }) => {
  const { colors } = useTheme();

  const { addToIngredientsList, isIngredientInList } = useIngredientsListStore();

  const uniqueIngredients = useMemo(() => {
    const unique = [];

    for (const item of ingredients) {
      const foundIndex = unique.findIndex((ingr) => ingr.id === item.id);
      if (foundIndex !== -1) {
        unique.splice(foundIndex, 1);
      }
      unique.push(item);
    }

    return unique;
  }, [ingredients]);

  return (
    <IngredientsWrapper>
      <SectionTitle>Ingredients</SectionTitle>

      <IngredientsList>
        {uniqueIngredients.map((ingredient, i) => {
          return (
            <IngredientItem key={`${ingredient.id}${i}`}>
              <IngredientInfo>
                {getIngredientMeasuresString(ingredient.measures)} <span>{ingredient.name}</span>
              </IngredientInfo>

              <StyledButton
                title={
                  isIngredientInList(ingredient.id)
                    ? 'Remove from shopping list'
                    : 'Add to shopping list'
                }
                icon={
                  isIngredientInList(ingredient.id) ? (
                    <XMarkIcon fillColor={colors.white} />
                  ) : (
                    <PlusIcon />
                  )
                }
                onClick={() => addToIngredientsList(ingredient)}
              />
            </IngredientItem>
          );
        })}
      </IngredientsList>
    </IngredientsWrapper>
  );
};

export default observer(Ingredients);
