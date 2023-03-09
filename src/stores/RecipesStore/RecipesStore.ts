import { action, computed, makeAutoObservable, observable, runInAction } from 'mobx';

import { mock } from '@pages/RecipesPage/mock';
import ApiRequest from '@stores/ApiRequest';
import { DishWithNutritionType } from '@stores/DishStore';
import MetaStore from '@stores/MetaStore';
import {
  CollectionModel,
  getInitialCollection,
  linearizeCollection,
  normalizeCollection,
} from '@stores/models/shared';
import QueryStore from '@stores/QueryStore';
import RootStore from '@stores/RootStore';
import { AllRecipesPaths } from '@typings/api';
import { Option, UniqueId } from '@typings/common';
import { getAllRecipesUrl } from '@utils/getUrl';

import { IRecipesStore, normalizeRecipes, RecipesModel } from './model';

type PrivateFields =
  | '_rootStore'
  | '_recipes'
  | '_currentOffset'
  | '_mealTypes'
  | '_onParamsUpdate';

class RecipesStore implements IRecipesStore {
  private readonly _rootStore: RootStore;
  private readonly _queryStore: QueryStore;

  private readonly _apiRequest = new ApiRequest();
  private readonly _meta = new MetaStore();

  // todo call first 30 items
  private readonly requestItemsNumber = 20;

  private _recipes: CollectionModel<UniqueId, DishWithNutritionType> = getInitialCollection();

  private _currentOffset = 0;
  public totalResults: null | number = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable<RecipesStore, PrivateFields>(this, {
      _rootStore: false,
      _recipes: observable.ref,
      _currentOffset: observable,
      _mealTypes: computed,
      _onParamsUpdate: action,
    });
    this._rootStore = rootStore;
    this._queryStore = this._rootStore.queryStore;
  }

  get meta() {
    return this._meta;
  }

  get recipes(): DishWithNutritionType[] {
    return linearizeCollection(this._recipes);
  }

  private get _mealTypes() {
    const type = this._queryStore.type;
    return !!type ? type.split(',') : [];
  }

  setRecipes = (recipes: DishWithNutritionType[]) => {
    this._recipes = normalizeCollection(recipes, (recipes) => recipes.id);
  };

  getAllRecipes = async (qStr?: string, typesOpts?: Option[]) => {
    this._meta.setLoading();
    this._onParamsUpdate({ qStr, typesOpts });
    this._queryStore.setParams({ offset: String(this._currentOffset) });

    const params = this._queryStore.getParams() || undefined;
    const url = getAllRecipesUrl(AllRecipesPaths.complex, params);

    try {
      const data = await this._apiRequest.request<RecipesModel>(url);

      // todo delete mock
      // const mockData: RecipesType = { results: [], totalResults: 0 };
      // const eightyItems = Array(40)
      //   .fill([...mock])
      //   .flat();
      // mockData.results = [...eightyItems];
      // mockData.totalResults = mockData.results.length;

      // const data = await new Promise<RecipesType>((res) => {
      //   setTimeout(() => res(mockData), 2000);
      // });

      runInAction(() => {
        if (data) {
          this.setRecipes([...this.recipes, ...normalizeRecipes(data)]);
          this.totalResults = data.totalResults;
          this._currentOffset += this.requestItemsNumber;
        }
      });
    } catch (error: any) {
      runInAction(() => {
        this._meta.setError(this._apiRequest.error);
      });
      throw new Error(`getAllRecipes: ${error.message}`);
    }
    runInAction(() => {
      this._meta.setInitial();
    });
  };

  private _onParamsUpdate = ({ qStr, typesOpts }: { qStr?: string; typesOpts?: Option[] }) => {
    const q = qStr?.toLocaleLowerCase();
    const types = typesOpts?.map((type) => type.key);

    const didQueryUpdate = q !== undefined && q !== this._queryStore.query;

    const didTypesUpdate =
      types !== undefined &&
      (types.length !== this._mealTypes.length ||
        types.every((type) => this._mealTypes.includes(type)));

    const didSearchUpdate = didQueryUpdate || didTypesUpdate;

    if (didQueryUpdate) {
      this._queryStore.setParams({ query: q });
    }

    if (didTypesUpdate) {
      this._queryStore.setParams({ type: types.join(',') });
    }

    this._queryStore.setParams({ number: String(this.requestItemsNumber) });

    if (didSearchUpdate) {
      this.setRecipes([]);
      this._currentOffset = 0;
      this._queryStore.setParams({ offset: String(0) });
    }
  };
}

export default RecipesStore;
