import React, { FC, useEffect } from 'react';

import parse from 'html-react-parser';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';

import { stats } from '@config/recipe';
import { useLocalStore } from '@hooks/useLocalStore';
import { ArrowIcon } from '@static/icons';
import DishStore from '@stores/DishStore';
import { useCollectionStore, useIngredientsListStore, useMetaStore } from '@stores/RootStore';
import { formPlural } from '@utils/formPlural';
import { replaceImage } from '@utils/replaceImage';

import Ingredients from './components/Ingredients';
import RecipeInstructions from './components/RecipeInstructions';
import RecipePageSkeleton from './components/RecipePageSkeleton';
import SimilarRecipes from './components/SimilarRecipes';
import ErrorPage from './ErrorPage';
import {
  DishPhoto,
  PageWrapper,
  PhotoWrapper,
  RecipeDescription,
  RecipeInfo,
  RecipeName,
  RecipeStats,
  StatsItem,
  StatsName,
  FixedButton,
  Nutrition,
  Nutrient,
  NutrientName,
  NutrientPercent,
  RecipeSections,
} from './RecipePage.styles';

const RecipePage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getDish, dishInfo, similar, getSimilar } = useLocalStore<DishStore>(
    () => new DishStore()
  );
  const { loading, error, isError } = useMetaStore();
  const { initIngredientsList } = useIngredientsListStore();
  const { initCollection } = useCollectionStore();

  useEffect(() => {
    const init = async () => {
      await getDish(Number(id));
      await getSimilar(Number(id));
      initIngredientsList();
      initCollection();
    };

    init();
  }, [id]);

  const goBack = () => navigate(-1);

  if (!loading && (isError || !dishInfo)) {
    return <ErrorPage message={error?.message || ''} />;
  }

  return (
    <PageWrapper>
      <FixedButton
        icon={<ArrowIcon />}
        onClick={goBack}
        width="45px"
        shape="square"
        bgColor="transparent"
      />

      <RecipePageSkeleton loading={loading} />

      {!loading && dishInfo && (
        <>
          <PhotoWrapper>
            <DishPhoto src={dishInfo.image} alt="dish serving option" onError={replaceImage} />

            <Nutrition title="Nutrition per serving">
              {dishInfo.nutrients.map(({ amount, name, unit }, i) => (
                <Nutrient key={name + i}>
                  <NutrientPercent>
                    {Math.round(amount)}
                    {unit}
                  </NutrientPercent>
                  <NutrientName>{name}</NutrientName>
                </Nutrient>
              ))}
            </Nutrition>
          </PhotoWrapper>

          <RecipeInfo>
            <RecipeName>{dishInfo.title}</RecipeName>

            <RecipeStats>
              {stats(dishInfo).map(({ icon, quantity, name }, i) => (
                <StatsItem key={i}>
                  {icon}
                  <StatsName>
                    {quantity} {formPlural(name, quantity || 0)}
                  </StatsName>
                </StatsItem>
              ))}
            </RecipeStats>

            <RecipeSections>
              <RecipeDescription>{parse(dishInfo.summary)}</RecipeDescription>

              <Ingredients ingredients={dishInfo.extendedIngredients} />

              {!!dishInfo.steps.length && <RecipeInstructions steps={dishInfo.steps} />}

              <SimilarRecipes recipes={similar} />
            </RecipeSections>
          </RecipeInfo>
        </>
      )}
    </PageWrapper>
  );
};

export default observer(RecipePage);
