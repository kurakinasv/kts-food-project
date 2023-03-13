export enum SingleRecipePaths {
  info = '/information',
  similar = '/similar',
}

export enum AllRecipesPaths {
  complex = '/complexSearch',
  random = '/random',
  bulk = '/informationBulk',
}

export type RecipesQueryParams =
  | 'query'
  | 'number'
  | 'addRecipeNutrition'
  | 'offset'
  | 'apiKey'
  | 'type'
  | 'results'
  | 'ids'
  | 'includeNutrition';

export type DishQueryParams = 'includeNutrition' | 'apiKey' | 'number';

export type SearchParamsNames = Extract<RecipesQueryParams, 'query' | 'type' | 'results'>;

export type SearchParams<T extends RecipesQueryParams | DishQueryParams> = Record<T, string>;
