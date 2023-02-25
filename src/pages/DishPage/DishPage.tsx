import { FC, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowIcon, ClockIcon, HeartIcon } from '@static/icons';
import { useDishStore } from '@stores/DishStore';
import { uefCallback } from '@utils/handleUseEffectAsyncRequest';

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
} from './DishPage.styles';
import ErrorPage from './ErrorPage';
import { mock } from './mock';

const DishPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const dishInfo = mock;
  const { getDish, dishInfo, error } = useDishStore();

  useEffect(uefCallback(getDish, Number(id)), []);

  const goBack = () => navigate(-1);

  if (error?.isError) {
    return <ErrorPage message={error.message} />;
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

      <PhotoWrapper>
        <DishPhoto src={dishInfo?.image} alt="dish" />

        <Nutrition title="Nutrition per serving">
          {dishInfo?.nutrients.map(({ amount, name, unit }, i) => (
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
        <RecipeName>{dishInfo?.title}</RecipeName>

        <RecipeStats>
          <StatsItem>
            <ClockIcon />
            <StatsName>{dishInfo?.readyInMinutes} minutes</StatsName>
          </StatsItem>
          <StatsItem>
            <HeartIcon />
            <StatsName>{dishInfo?.aggregateLikes} likes</StatsName>
          </StatsItem>
        </RecipeStats>

        <RecipeDescription>{dishInfo?.instructions}</RecipeDescription>
      </RecipeInfo>
    </PageWrapper>
  );
};

export default observer(DishPage);
