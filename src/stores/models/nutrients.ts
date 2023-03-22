import { nutrientsNames } from '@config/recipe';

export type NutrientsNames = 'Fat' | 'Carbohydrates' | 'Protein';

const caloriesApiName = 'Calories';

export type NutrientApi = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

export type NutrientModel = {
  name: string;
  amount: number;
  unit: string;
};

export const normalizeNutrients = (apiNutrients: NutrientApi[]) => {
  const calories = apiNutrients.find((item) => item.name === caloriesApiName)?.amount ?? 0;

  const filteredNutrients = apiNutrients.filter(
    ({ name }) => nutrientsNames.findIndex((item) => item === name) !== -1
  );

  const nutrients: NutrientModel[] = filteredNutrients.reduce(
    (acc, { amount, name, unit }) => [...acc, { amount, name, unit }],
    [] as NutrientModel[]
  );

  return { calories, nutrients };
};
