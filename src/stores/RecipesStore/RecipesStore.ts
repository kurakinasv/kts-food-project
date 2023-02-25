import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import { mock } from '@pages/RecipesPage/mock';
import { DishWithNutritionType } from '@stores/DishStore';
import { getAllRecipesUrl } from '@utils/getUrl';

import { IRecipesStore, normalizeRecipes, RecipesType } from './model';

class RecipesStore implements IRecipesStore {
  public recipes: DishWithNutritionType[] | null = null;

  private readonly requestItemsNumber = 20;
  private currentOffset = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setRecipes = (recipes: DishWithNutritionType[]) => {
    this.recipes = recipes;
  };

  getAllRecipes = async () => {
    const url = getAllRecipesUrl(undefined, [
      ['number', String(this.requestItemsNumber)],
      ['offset', String(this.currentOffset)],
    ]);

    try {
      const response: { data: RecipesType } = await axios.get(url);

      if (!response.data) {
        // todo get error message
        throw new Error('Error while handling request');
      }

      console.log('getAllRecipes', response.data);

      this.setRecipes([...(this.recipes ?? []), ...normalizeRecipes(response.data)]);

      // const mockData: RecipesType = { results: [] };
      // const tenItems = [...mock, ...mock, ...mock, ...mock, ...mock, ...mock];
      // mockData.results = [...tenItems, ...tenItems];

      // this.setRecipes([...(this.recipes ?? []), ...normalizeRecipes(mockData)]);

      runInAction(() => {
        this.currentOffset += this.requestItemsNumber;
      });
    } catch (error: any) {
      throw new Error('getAllRecipes', error.message);
    }
  };
}

export default RecipesStore;
