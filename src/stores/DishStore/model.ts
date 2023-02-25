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

// getting all recipes by /complexSearch?addRecipeNutrition=true
export type DishWithNutritionApiType = DishApiType & NutritionApiType;

// getting one recipe by :id/information?includeNutrition=true
export type ExtendedDishApiType = DishApiType &
  NutritionApiType & {
    aggregateLikes: number;
    readyInMinutes: number;
    summary: string;

    instructions: string;
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

export type DishWithNutritionType = DishType & NutritionType;

export type ExtendedDishType = DishType &
  NutritionType & {
    aggregateLikes: number;
    readyInMinutes: number;
    summary: string;

    instructions: string;
  };

//------------------------------------------

export interface IDishStore {
  dishInfo: ExtendedDishType | null;

  setDishInfo(info: ExtendedDishType): void;
  getDish(id: number): Promise<void>;
}

export const normalizeDish = (apiDish: ExtendedDishApiType): ExtendedDishType => {
  const { id, aggregateLikes, image, instructions, readyInMinutes, summary, title, nutrition } =
    apiDish;

  const ingredients = nutrition.ingredients.map((item) => item.name);

  const { calories, nutrients } = normalizeNutrients(nutrition.nutrients);

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
  };

  return dish;
};
