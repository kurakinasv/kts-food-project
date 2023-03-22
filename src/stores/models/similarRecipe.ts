import { ImageType, UniqueId } from '@typings/common';

// /:id/similar
export type SimilarRecipeApi = {
  id: UniqueId;
  title: string;
  imageType: ImageType;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
};

export type SimilarRecipeModel = {
  id: UniqueId;
  title: string;
  readyInMinutes: number;
  servings: number;
};

export const normalizeSimilarRecipe = (apiDish: SimilarRecipeApi): SimilarRecipeModel => {
  const { id, title, readyInMinutes, servings } = apiDish;
  return { id, title, readyInMinutes, servings };
};
