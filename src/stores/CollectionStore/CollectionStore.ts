import { action, makeAutoObservable, observable } from 'mobx';

import { collectionStorage } from '@config/storage';
import { DishWithNutritionModel } from '@stores/DishStore';
import {
  CollectionModel,
  getInitialCollection,
  linearizeCollection,
  normalizeCollection,
} from '@stores/models/shared';
import RootStore from '@stores/RootStore';
import { UniqueId } from '@typings/common';
import { normalizeString } from '@utils/normalizeString';

type PrivateFields = '_collectionRecipes' | '_filteredRecipes' | '_updateFiltered';

class CollectionStore {
  private readonly _rootStore: RootStore;
  private _collectionRecipes: CollectionModel<UniqueId, DishWithNutritionModel> =
    getInitialCollection();
  private _filteredRecipes: DishWithNutritionModel[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable<CollectionStore, PrivateFields>(this, {
      _collectionRecipes: observable.ref,
      _filteredRecipes: observable.ref,
      _updateFiltered: action,
    });
    this._rootStore = rootStore;
  }

  get collectionRecipes() {
    return linearizeCollection(this._collectionRecipes);
  }

  get filteredRecipes() {
    return this._filteredRecipes;
  }

  setCollectionRecipes = (recipes: DishWithNutritionModel[]) => {
    this._collectionRecipes = normalizeCollection(recipes, (rec) => rec.id);
  };

  setFiltered = (recipes: DishWithNutritionModel[]) => {
    this._filteredRecipes = recipes;
  };

  initCollection = () => {
    const collectionRecipesRaw = localStorage.getItem(collectionStorage);

    const recipes: DishWithNutritionModel[] = collectionRecipesRaw
      ? JSON.parse(collectionRecipesRaw)
      : [];

    this.setCollectionRecipes(recipes);
  };

  addToCollection = (id: number) => {
    if (this.isRecipeExistInCollection(id)) {
      this.deleteFromCollection(id);
      return;
    }

    let recipeToAdd;
    if (this._rootStore.recipesStore.recipes.length) {
      recipeToAdd = this._rootStore.recipesStore.recipesCollection.entities[id];
    }
    if (!recipeToAdd) {
      recipeToAdd = this._rootStore.recipesStore.additionalRecipes.entities[id];
    }
    const updatedCollection = [...(this.collectionRecipes ?? []), recipeToAdd];

    this.setCollectionRecipes(updatedCollection);
    localStorage.setItem(collectionStorage, JSON.stringify(updatedCollection));
  };

  deleteFromCollection = (id: number) => {
    if (!this.isRecipeExistInCollection(id)) {
      return;
    }

    const updatedCollection = this.collectionRecipes.filter((dish) => dish.id !== id);

    this.setCollectionRecipes(updatedCollection);
    this._updateFiltered();

    if (!updatedCollection.length) {
      localStorage.removeItem(collectionStorage);
      return;
    }
    localStorage.setItem(collectionStorage, JSON.stringify(updatedCollection));
  };

  isRecipeExistInCollection = (id: number) => {
    return this._collectionRecipes.order.includes(id);
  };

  searchRecipes = (value: string) => {
    const valueToCheck = normalizeString(value);

    const filtered = this.collectionRecipes.filter(({ title, ingredients }) => {
      const titleToCompare = normalizeString(title);

      const matchesName = titleToCompare.includes(valueToCheck);
      const includesIngredient = ingredients.some((ingredient) =>
        ingredient.includes(valueToCheck)
      );

      return matchesName || includesIngredient;
    });

    this.setFiltered(filtered);
  };

  private _updateFiltered = () => {
    const filtered = this._filteredRecipes.filter((filtRec) =>
      this._collectionRecipes.order.includes(filtRec.id)
    );
    this.setFiltered(filtered);
  };
}

export default CollectionStore;
