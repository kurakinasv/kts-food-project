import { API_KEY, BASE_URL } from '@config/api';
import {
  AllRecipesPaths,
  DishQueryParams,
  ParamsMapType,
  RecipesQueryParams,
  SingleRecipePaths,
} from '@typings/api';

const getApiParam = <T>() => ['apiKey', API_KEY] as [T, string];

export const getQueryString = <T extends RecipesQueryParams | DishQueryParams>(
  params: ParamsMapType<T>
): string => {
  const paramsWithValues: ParamsMapType<T> = params.reduce((prevParams, param) => {
    if (!param[1]) {
      return [...prevParams];
    }

    return [...prevParams, [...param]];
  }, [] as ParamsMapType<T>);

  const query = new URLSearchParams(paramsWithValues);

  return '?' + query.toString().replace(/%2C/g, ',');
};

export const getAllRecipesUrl = (
  hanledPath?: AllRecipesPaths,
  params?: ParamsMapType<RecipesQueryParams>
) => {
  const path = hanledPath ?? AllRecipesPaths.complex;

  const paramsArray: ParamsMapType<RecipesQueryParams> = [
    ...(params ?? []),
    ['addRecipeNutrition', 'true'],
    getApiParam(),
  ];

  const query = getQueryString(paramsArray);

  return BASE_URL + path + query;
};

export const getSingleRecipeUrl = (id: number, hanledPath?: SingleRecipePaths) => {
  const path = hanledPath ?? SingleRecipePaths.info;
  const query = getQueryString<DishQueryParams>([['includeNutrition', 'true'], getApiParam()]);

  return BASE_URL + '/' + id + path + query;
};
