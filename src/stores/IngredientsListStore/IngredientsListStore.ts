import { makeAutoObservable, observable } from 'mobx';

import { ingredientsListStorage } from '@config/storage';
import { ExtendedIngredientModel } from '@stores/models/ingredients';
import {
  CollectionModel,
  getInitialCollection,
  linearizeCollection,
  normalizeCollection,
} from '@stores/models/shared';
import RootStore from '@stores/RootStore';
import { UniqueId } from '@typings/common';

type PrivateFields = '_list';

class IngredientsListStore {
  private readonly _rootStore: RootStore;
  private _list: CollectionModel<UniqueId, ExtendedIngredientModel> = getInitialCollection();

  constructor(rootStore: RootStore) {
    makeAutoObservable<IngredientsListStore, PrivateFields>(this, {
      _list: observable.ref,
    });
    this._rootStore = rootStore;
  }

  get list() {
    return linearizeCollection(this._list);
  }

  setIngredientsList = (list: ExtendedIngredientModel[]) => {
    this._list = normalizeCollection(list, (item) => item.id);
  };

  initIngredientsList = () => {
    const ingredientsListRaw = localStorage.getItem(ingredientsListStorage);

    const ingredientsList: ExtendedIngredientModel[] = ingredientsListRaw
      ? JSON.parse(ingredientsListRaw)
      : [];

    this.setIngredientsList(ingredientsList);
  };

  addToIngredientsList = (ingredient: ExtendedIngredientModel) => {
    if (this.isIngredientInList(ingredient.id)) {
      this.deleteFromList(ingredient.id);
      return;
    }

    const updatedCollection = [...(this.list ?? []), ingredient];
    this.setIngredientsList(updatedCollection);
    localStorage.setItem(ingredientsListStorage, JSON.stringify(updatedCollection));
  };

  isIngredientInList = (id: UniqueId): boolean => {
    return this._list.order.includes(id);
  };

  deleteFromList = (id: number) => {
    if (!this.isIngredientInList(id)) {
      return;
    }

    const updatedCollection = this.list.filter((ingr) => ingr.id !== id);

    if (!updatedCollection.length) {
      this.clearIngredientsList();
      return;
    }

    this.setIngredientsList(updatedCollection);
    localStorage.setItem(ingredientsListStorage, JSON.stringify(updatedCollection));
  };

  clearIngredientsList = () => {
    this.setIngredientsList([]);
    localStorage.removeItem(ingredientsListStorage);
  };
}

export default IngredientsListStore;
