export enum SingleRecipePaths {
  info = '/information',
}

export enum AllRecipesPaths {
  complex = '/complexSearch',
}

export type RecipesQueryParams = 'query' | 'number' | 'addRecipeNutrition' | 'offset';
export type DishQueryParams = 'includeNutrition';
