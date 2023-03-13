import { ClockIcon, DishIcon, HeartIcon } from '@static/icons';
import { ExtendedDishModel } from '@stores/DishStore';
import { MealTypes } from '@stores/models/mealtypes';
import { NutrientsNames } from '@stores/models/nutrients';

export const nutrientsNames: NutrientsNames[] = ['Carbohydrates', 'Fat', 'Protein'];

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

export const stats = (dishInfo: ExtendedDishModel | null) => [
  {
    name: 'minute',
    icon: <ClockIcon />,
    quantity: dishInfo?.readyInMinutes,
  },
  {
    name: 'like',
    icon: <HeartIcon />,
    quantity: dishInfo?.aggregateLikes,
  },
  {
    name: 'serving',
    icon: <DishIcon />,
    quantity: dishInfo?.servings,
  },
];
