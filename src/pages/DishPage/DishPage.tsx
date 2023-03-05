import React, { FC, useEffect, useMemo } from 'react';

import parse from 'html-react-parser';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowIcon, ClockIcon, DishIcon, HeartIcon } from '@static/icons';
import { useDishStore } from '@stores/DishStore';
import { formPlural } from '@utils/formPlural';
import { uefCallback } from '@utils/handleUseEffectAsyncRequest';
import { replaceImage } from '@utils/replaceImage';

import DishPageSkeleton from './components/DishPageSkeleton';
import RecipeInstructions from './components/RecipeInstructions';
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

const DishPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDish, dishInfo, meta } = useDishStore();

  useEffect(uefCallback(getDish, Number(id)), []);

  const goBack = () => navigate(-1);

  const stats = useMemo(
    () => [
      {
        name: 'minute',
        icon: <ClockIcon />,
        quantity: dishInfo?.readyInMinutes,
      },
      {
        name: 'like',
        icon: <HeartIcon />,
        quantity: dishInfo?.aggregateLikes,
      },
      {
        name: 'serving',
        icon: <DishIcon />,
        quantity: dishInfo?.servings,
      },
    ],
    [dishInfo]
  );

  if (!meta.loading && (meta.isError || !dishInfo)) {
    return <ErrorPage message={meta.error?.message || ''} />;
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
      <DishPageSkeleton loading={meta.loading} />

      {!meta.loading && dishInfo && (
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
              {stats.map(({ icon, quantity, name }, i) => (
                <StatsItem key={i}>
                  {icon}
                  <StatsName>
                    {quantity} {formPlural(name, quantity || 0)}
                  </StatsName>
                </StatsItem>
              ))}
            </RecipeStats>

            <RecipeDescription>{parse(dishInfo.summary)}</RecipeDescription>

            {!!dishInfo.steps.length && <RecipeInstructions steps={dishInfo.steps} />}
          </RecipeInfo>
        </>
      )}
    </PageWrapper>
  );
};

export default observer(DishPage);
