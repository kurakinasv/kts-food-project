import { Option } from '@components/MultiDropdown';

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

export type MealTypes =
  | 'main course'
  | 'side dish'
  | 'dessert'
  | 'appetizer'
  | 'salad'
  | 'bread'
  | 'breakfast'
  | 'soup'
  | 'beverage'
  | 'sauce'
  | 'marinade'
  | 'fingerfood'
  | 'snack'
  | 'drink';

export const mealTypes: MealTypes[] = [
  'appetizer',
  'beverage',
  'bread',
  'breakfast',
  'dessert',
  'drink',
  'fingerfood',
  'main course',
  'marinade',
  'salad',
  'sauce',
  'side dish',
  'snack',
  'soup',
];

export type SearchParamsNames = Extract<RecipesQueryParams, 'number' | 'query' | 'type' | 'offset'>;
export type SearchParamsType = Record<SearchParamsNames, string>;

export type ParamsMapType<T extends RecipesQueryParams | DishQueryParams> = Array<[T, string]>;

export const mealTypesOptions: Option[] = mealTypes.reduce((options, type) => {
  const value = type.charAt(0).toUpperCase() + type.slice(1);
  return [...options, { key: type, value }];
}, [] as Option[]);
