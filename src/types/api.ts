export enum SingleRecipePaths {
  info = '/information',
}

export enum AllRecipesPaths {
  complex = '/complexSearch',
  random = '/random',
}

export type RecipesQueryParams =
  | 'query'
  | 'number'
  | 'addRecipeNutrition'
  | 'offset'
  | 'apiKey'
  | 'type'
  | 'results';

export type DishQueryParams = 'includeNutrition' | 'apiKey';

export type SearchParamsNames = Extract<RecipesQueryParams, 'query' | 'type' | 'results'>;

export type SearchParams<T extends RecipesQueryParams | DishQueryParams> = Record<T, string>;
