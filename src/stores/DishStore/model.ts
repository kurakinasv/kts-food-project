import { ImageType, ImageURL, UniqueId } from '@typings/common';
import { normalizeNutrients, NutrientApiType, NutrientType } from '@typings/nutrients';

type IngredientApiType = {
  id: UniqueId;
  name: string;
  amount: number;
  unit: string;
  nutrients: NutrientApiType[];
};

// getting data by /complexSearch
type DishApiType = {
  id: UniqueId;
  title: string;
  image: ImageURL;
  imageType: ImageType;
};

type NutritionApiType = {
  nutrition: {
    ingredients: IngredientApiType[];
    nutrients: NutrientApiType[];
  };
};

type InstructionStepsApi = {
  equipment: Array<unknown>;
  ingredients: Array<unknown>;
  length?: {
    number: number;
    unit: string;
  };
  number: number; // number of step
  step: string;
};

type AnalyzedInstructionsApi = {
  name: string;
  steps: InstructionStepsApi[];
};

// getting all recipes by /complexSearch?addRecipeNutrition=true
export type DishWithNutritionApiType = DishApiType & NutritionApiType;

// getting one recipe by :id/information?includeNutrition=true
export type ExtendedDishApiType = DishApiType &
  NutritionApiType & {
    aggregateLikes: number;
    readyInMinutes: number;
    summary: string;

    instructions: string;
    servings: number;
    analyzedInstructions: AnalyzedInstructionsApi[];
  };

//------------------------------------------

type DishType = {
  id: UniqueId;
  title: string;
  image: ImageURL;
};

type NutritionType = {
  ingredients: string[];
  calories: number;
  nutrients: NutrientType[];
};

export type InstructionStepsModel = {
  number: number; // number of step
  step: string;
};

export type DishWithNutritionType = DishType & NutritionType;

export type ExtendedDishType = DishType &
  NutritionType & {
    aggregateLikes: number;
    readyInMinutes: number;
    summary: string;

    instructions: string;
    servings: number;
    steps: InstructionStepsModel[];
  };

//------------------------------------------

export interface IDishStore {
  dishInfo: ExtendedDishType | null;

  setDishInfo(info: ExtendedDishType): void;
  getDish(id: number): Promise<void>;
}

const normalizeSteps = (steps: InstructionStepsApi[]): InstructionStepsModel[] =>
  steps.map(({ number, step }) => ({ number, step }));

const normalizeInstructions = (
  apiInstructions: AnalyzedInstructionsApi[]
): InstructionStepsApi[] => {
  if (!apiInstructions.length) {
    return [];
  }

  // add name property to the first step
  const instructions = apiInstructions.map(({ name, steps }) => {
    const [step1, ...subSteps] = steps;
    const nameToAdd = !!name ? name + '. ' : '';
    return [{ ...step1, step: `${nameToAdd}${step1.step}` }, ...subSteps];
  });

  return instructions.flat();
};

export const normalizeDish = (apiDish: ExtendedDishApiType): ExtendedDishType => {
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

  const dish: ExtendedDishType = {
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
