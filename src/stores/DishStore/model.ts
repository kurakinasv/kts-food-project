import {
  AnalyzedInstructionsApi,
  InstructionStepsModel,
  normalizeInstructions,
  normalizeSteps,
} from '@stores/models/instructions';
import { normalizeNutrients, NutrientApi, NutrientModel } from '@stores/models/nutrients';
import { ImageType, ImageURL, UniqueId } from '@typings/common';

type IngredientApi = {
  id: UniqueId;
  name: string;
  amount: number;
  unit: string;
  nutrients: NutrientApi[];
};

// getting data by /complexSearch
export type DishApi = {
  id: UniqueId;
  title: string;
  image: ImageURL;
  imageType: ImageType;
};

type NutritionApi = {
  nutrition: {
    ingredients: IngredientApi[];
    nutrients: NutrientApi[];
  };
};

// getting all recipes by /complexSearch?addRecipeNutrition=true
export type DishWithNutritionApi = DishApi & NutritionApi;

// getting one recipe by :id/information?includeNutrition=true
export type ExtendedDishApi = DishApi &
  NutritionApi & {
    aggregateLikes: number;
    readyInMinutes: number;
    summary: string;

    instructions: string;
    servings: number;
    analyzedInstructions: AnalyzedInstructionsApi[];
  };

//------------------------------------------

type DishModel = {
  id: UniqueId;
  title: string;
  image: ImageURL;
};

type NutritionModel = {
  ingredients: string[];
  calories: number;
  nutrients: NutrientModel[];
};

export type DishWithNutritionType = DishModel & NutritionModel;

export type ExtendedDishModel = DishModel &
  NutritionModel & {
    aggregateLikes: number;
    readyInMinutes: number;
    summary: string;

    instructions: string;
    servings: number;
    steps: InstructionStepsModel[];
  };

//------------------------------------------

export interface IDishStore {
  dishInfo: ExtendedDishModel | null;

  setDishInfo(info: ExtendedDishModel): void;
  getDish(id: number): Promise<void>;
}

export const normalizeDish = (apiDish: ExtendedDishApi): ExtendedDishModel => {
  const {
    id,
    aggregateLikes,
    image,
    instructions,
    readyInMinutes,
    summary,
    title,
    nutrition,
    analyzedInstructions,
    servings,
  } = apiDish;

  const ingredients = nutrition.ingredients.map((item) => item.name);

  const { calories, nutrients } = normalizeNutrients(nutrition.nutrients);

  const instructionSteps = normalizeInstructions(analyzedInstructions);
  const steps = normalizeSteps(instructionSteps);

  const dish: ExtendedDishModel = {
    id,
    aggregateLikes,
    image,
    instructions,
    readyInMinutes,
    summary,
    title,
    ingredients,
    calories,
    nutrients,
    steps,
    servings,
  };

  return dish;
};
