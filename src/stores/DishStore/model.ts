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
type DishApi = {
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

type DishAdditionalInfoApi = {
  aggregateLikes: number;
  readyInMinutes: number;
  summary: string;

  instructions: string;
  servings: number;
  analyzedInstructions: AnalyzedInstructionsApi[];
};

// getting all recipes by /complexSearch?addRecipeNutrition=true
export type DishWithNutritionApi = DishApi & NutritionApi;

// getting one recipe by :id/information?includeNutrition=true
export type ExtendedDishApi = DishApi & NutritionApi & DishAdditionalInfoApi;

// getting one recipe by :id/information
export type DishFullInfoApi = DishApi & DishAdditionalInfoApi;

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

type DishAdditionalInfoModel = {
  aggregateLikes: number;
  readyInMinutes: number;
  summary: string;

  instructions: string;
  servings: number;
  steps: InstructionStepsModel[];
};

export type DishWithNutritionModel = DishModel & NutritionModel;

export type ExtendedDishModel = DishModel & NutritionModel & DishAdditionalInfoModel;

export type DishFullInfoModel = DishModel & DishAdditionalInfoModel;

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
