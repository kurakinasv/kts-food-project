import { API_KEY, BASE_URL } from '@config/api';
import {
  AllRecipesPaths,
  DishQueryParams,
  RecipesQueryParams,
  SingleRecipePaths,
} from '@typings/api';

type ParamsValuesMap<T extends RecipesQueryParams | DishQueryParams> = Array<[T, string]>;

const getQueryString = <T extends RecipesQueryParams | DishQueryParams>(
  params: ParamsValuesMap<T>
): string => {
  return params.reduce((str, [qName, value]) => `${str}&${qName}=${value}`, '');
};

export const getAllRecipesUrl = (
  hanledPath?: AllRecipesPaths,
  params?: ParamsValuesMap<RecipesQueryParams>
) => {
  const path = hanledPath ?? AllRecipesPaths.complex;

  const paramsArray: ParamsValuesMap<RecipesQueryParams> = [
    ...(params ?? []),
    ['addRecipeNutrition', 'true'],
  ];

  const query = getQueryString(paramsArray);

  return BASE_URL + path + API_KEY + query;
};

export const getSingleRecipeUrl = (id: number, hanledPath?: SingleRecipePaths) => {
  const path = hanledPath ?? SingleRecipePaths.info;
  const query = getQueryString<DishQueryParams>([['includeNutrition', 'true']]);

  return BASE_URL + '/' + id + path + API_KEY + query;
};
