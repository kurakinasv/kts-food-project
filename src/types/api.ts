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

export type SingleRecipeQueryParams = 'includeNutrition' | 'apiKey' | 'number';

export type SearchParamsNames = Extract<RecipesQueryParams, 'query' | 'type' | 'results'>;

export type SearchParams<T extends RecipesQueryParams | SingleRecipeQueryParams> = Record<
  T,
  string
>;
