import { DishWithNutritionType, DishWithNutritionApiType } from '@stores/DishStore';
import { normalizeNutrients } from '@typings/nutrients';

export type RecipesApiType = {
  offset: number; // number of results to skip (0-900)
  number: number; // number of recipes we want to get (1-100)
  results: DishWithNutritionApiType[];
  totalResults: number;
};

export type RecipesType = Pick<RecipesApiType, 'results'>;

export interface IRecipesStore {
  recipes: DishWithNutritionType[] | null;

  setRecipes(recipes: DishWithNutritionType[]): void;
  getAllRecipes(): Promise<void>;
}

export const normalizeRecipes = (apiRecipes: RecipesType) => {
  return apiRecipes.results.reduce((res, apiRecipe) => {
    const { id, image, title, nutrition } = apiRecipe;

    const ingredients = nutrition.ingredients.map((item) => item.name);

    const { calories, nutrients } = normalizeNutrients(nutrition.nutrients);

    const currentRecipe: DishWithNutritionType = {
      id,
      image,
      title,
      ingredients,
      calories,
      nutrients,
    };

    return [...res, currentRecipe];
  }, [] as DishWithNutritionType[]);
};
