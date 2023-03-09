export enum SingleRecipePaths {
  info = '/information',
}

export enum AllRecipesPaths {
  complex = '/complexSearch',
}

export type RecipesQueryParams =
  | 'query'
  | 'number'
  | 'addRecipeNutrition'
  | 'offset'
  | 'apiKey'
  | 'type';

export type DishQueryParams = 'includeNutrition' | 'apiKey';

export type SearchParamsNames = Extract<RecipesQueryParams, 'number' | 'query' | 'type' | 'offset'>;

export type SearchParams<T extends RecipesQueryParams | DishQueryParams> = Record<T, string>;
