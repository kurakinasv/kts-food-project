import { FC, useMemo } from 'react';

import { observer } from 'mobx-react-lite';

import Button from '@components/Button';
import { SectionTitle } from '@pages/DishPage/DishPage.styles';
import { XMarkIcon, PlusIcon } from '@static/icons';
import { ExtendedIngredientModel } from '@stores/models/ingredients';
import { useIngredientsListStore } from '@stores/RootStore';
import { getIngredientMeasuresString } from '@utils/getIngredientMeasuresString';

import {
  IngredientsWrapper,
  IngredientsList,
  IngredientItem,
  IngredientInfo,
} from './Ingredients.styles';

type IngredientsProps = {
  ingredients: ExtendedIngredientModel[];
};

const Ingredients: FC<IngredientsProps> = ({ ingredients }) => {
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

              <Button
                icon={
                  isIngredientInList(ingredient.id) ? <XMarkIcon fillColor="white" /> : <PlusIcon />
                }
                shape="circle"
                width="24px"
                minWidth="24px"
                padding="0"
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
