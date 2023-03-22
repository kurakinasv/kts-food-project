import { ingredientsBaseUrl } from '@config/api';
import { ImageURL, UniqueId } from '@typings/common';

type MeasuresItemApi = {
  amount: number;
  unitShort: string;
};

type MeasuresApi = {
  metric: MeasuresItemApi;
  us: MeasuresItemApi;
};

export type ExtendedIngredientApi = {
  id: UniqueId;
  name: string;
  nameClean: string;
  image: ImageURL;
  measures: MeasuresApi;
  amount: number;
  unit: string;
};

type MeasuresItemModel = {
  amount: number;
  unit: string; // unitShort
};

export type MeasuresModel = {
  metric: MeasuresItemModel;
  us: MeasuresItemModel;
};

export type ExtendedIngredientModel = {
  id: UniqueId;
  name: string; // nameClean
  image: ImageURL;
  measures: MeasuresModel;
};

export const normalizeIngredients = (
  apiIngredient: ExtendedIngredientApi
): ExtendedIngredientModel => {
  const { id, image, measures, nameClean, name } = apiIngredient;
  const { metric, us } = measures;

  const imageUrl = ingredientsBaseUrl + image;

  return {
    id,
    name: !!nameClean ? nameClean : name,
    image: imageUrl,
    measures: {
      metric: { amount: metric.amount, unit: metric.unitShort },
      us: { amount: us.amount, unit: us.unitShort },
    },
  };
};
