import { mealTypes } from '@config/recipe';
import { Option } from '@typings/common';

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

export const mealTypesOptions: Option[] = mealTypes.reduce((options, type) => {
  const value = type.charAt(0).toUpperCase() + type.slice(1);
  return [...options, { key: type, value }];
}, [] as Option[]);
