export type NutrientsNames = 'Fat' | 'Carbohydrates' | 'Protein';

export const nutrientsNames: NutrientsNames[] = ['Carbohydrates', 'Fat', 'Protein'];
const caloriesApiName = 'Calories';

export type NutrientApiType = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

export type NutrientType = {
  name: string;
  amount: number;
  unit: string;
};

export const normalizeNutrients = (apiNutrients: NutrientApiType[]) => {
  const calories = apiNutrients.find((item) => item.name === caloriesApiName)?.amount ?? 0;

  const filteredNutrients = apiNutrients.filter(
    ({ name }) => nutrientsNames.findIndex((item) => item === name) !== -1
  );

  const nutrients: NutrientType[] = filteredNutrients.reduce(
    (arr, { amount, name, unit }) => [...arr, { amount, name, unit }],
    [] as NutrientType[]
  );

  return { calories, nutrients };
};
