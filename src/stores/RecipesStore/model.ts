import { DishWithNutritionModel, DishWithNutritionApi } from '@stores/DishStore';
import { normalizeNutrients } from '@stores/models/nutrients';
import { Option } from '@typings/common';

export type RecipesApi = {
  offset: number; // number of results to skip (0-900)
  number: number; // number of recipes we want to get (1-100)
  results: DishWithNutritionApi[];
  totalResults: number;
};

export type RecipesModel = {
  results: DishWithNutritionModel[];
  totalResults: number;
};

export interface IRecipesStore {
  recipes: DishWithNutritionModel[] | null;

  setRecipes(recipes: DishWithNutritionModel[]): void;
  getAllRecipes(query?: string, types?: Option[]): Promise<void>;
}

export const normalizeRecipe = (apiRecipe: DishWithNutritionApi): DishWithNutritionModel => {
  const { id, image, title, nutrition } = apiRecipe;

  const ingredients = nutrition.ingredients.map((item) => item.name);

  const { calories, nutrients } = normalizeNutrients(nutrition.nutrients);

  return {
    id,
    image,
    title,
    ingredients,
    calories,
    nutrients,
  };
};
