import { API_KEY, BASE_URL } from '@config/api';
import {
  AllRecipesPaths,
  DishQueryParams,
  RecipesQueryParams,
  SearchParams,
  SingleRecipePaths,
} from '@typings/api';

const getApiParam = <T extends RecipesQueryParams | DishQueryParams>() =>
  ({ apiKey: API_KEY } as SearchParams<T>);

export const getQueryString = <T extends RecipesQueryParams | DishQueryParams>(
  params: Partial<SearchParams<T>>
): string => {
  const paramsToParse = Object.entries(params).reduce(
    (acc, [key, val]) => (val ? { ...acc, [key]: val } : acc),
    {} as SearchParams<T>
  );

  const query = new URLSearchParams(paramsToParse);

  return '?' + query.toString().replace(/%2C/g, ',');
};

export const getAllRecipesUrl = (
  hanledPath?: AllRecipesPaths,
  params?: Partial<SearchParams<RecipesQueryParams>>
) => {
  const path = hanledPath ?? AllRecipesPaths.complex;

  const paramsToParse: SearchParams<RecipesQueryParams> = {
    ...(params ?? []),
    ...getApiParam(),
  };

  const query = getQueryString<RecipesQueryParams>(paramsToParse);

  return BASE_URL + path + query;
};

export const getSingleRecipeUrl = (id: number, hanledPath?: SingleRecipePaths) => {
  const path = hanledPath ?? SingleRecipePaths.info;

  const paramsToParse: SearchParams<DishQueryParams> = {
    ...getApiParam(),
    includeNutrition: 'true',
  };

  const query = getQueryString<DishQueryParams>(paramsToParse);

  return BASE_URL + '/' + id + path + query;
};
