import { action, computed, makeAutoObservable, observable, runInAction } from 'mobx';

import { mock } from '@pages/RecipesPage/mock';
import ApiRequest from '@stores/ApiRequest';
import { DishFullInfoApi, DishWithNutritionModel } from '@stores/DishStore';
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

import { IRecipesStore, normalizeRecipes, RecipesApi, RecipesModel } from './model';

type PrivateFields =
  | '_rootStore'
  | '_recipes'
  | '_currentOffset'
  | '_mealTypes'
  | '_onParamsUpdate'
  | '_paramsToSearch';

class RecipesStore implements IRecipesStore {
  private readonly _rootStore: RootStore;
  private readonly _queryStore: QueryStore;

  private readonly _apiRequest = new ApiRequest();
  private readonly _meta = new MetaStore();

  // todo call first 30 items
  private readonly requestItemsNumber = 20;

  private _recipes: CollectionModel<UniqueId, DishWithNutritionModel> = getInitialCollection();

  private _currentOffset = 0;
  private _loadNext = this.requestItemsNumber;
  public totalResults: null | number = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable<RecipesStore, PrivateFields>(this, {
      _rootStore: false,
      _recipes: observable.ref,
      _currentOffset: observable,
      _mealTypes: computed,
      _paramsToSearch: computed,
      _onParamsUpdate: action,
    });
    this._rootStore = rootStore;
    this._queryStore = this._rootStore.queryStore;
  }

  get meta() {
    return this._meta;
  }

  get recipes(): DishWithNutritionModel[] {
    return linearizeCollection(this._recipes);
  }

  get recipesCollection() {
    return this._recipes;
  }

  private get _mealTypes() {
    const type = this._queryStore.type;
    return !!type ? type.split(',') : [];
  }

  private get _paramsToSearch() {
    const params = this._queryStore.params || undefined;

    const paramsToSet = {
      number: String(this._loadNext),
      offset: String(this._currentOffset),
      query: params?.query,
      type: params?.type,
      addRecipeNutrition: 'true',
    };

    return paramsToSet;
  }

  setRecipes = (recipes: DishWithNutritionModel[]) => {
    this._recipes = normalizeCollection(recipes, (recipes) => recipes.id);
  };

  getAllRecipes = async (query?: string, typesOptions?: Option[], results?: string) => {
    this._meta.setLoading();
    this._onParamsUpdate({ query, typesOptions, results });

    const url = getAllRecipesUrl(AllRecipesPaths.complex, this._paramsToSearch);

    try {
      const data = await this._apiRequest.request<RecipesApi>(url);

      // todo delete mock
      // const mockData: RecipesApi = { results: [], totalResults: 0, number: 30, offset: 0 };
      // const eightyItems = Array(40)
      //   .fill([...mock])
      //   .flat();
      // mockData.results = [...eightyItems];
      // mockData.totalResults = mockData.results.length;

      // const data = await new Promise<RecipesApi>((res) => {
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

  getRandom = async (): Promise<string> => {
    this._meta.setLoading();
    const url = getAllRecipesUrl(AllRecipesPaths.random, { number: '1' });

    try {
      const data = await this._apiRequest.request<{ recipes: DishFullInfoApi[] }>(url);
      let randomId = '';

      runInAction(() => {
        if (data) {
          randomId = String(data.recipes[0].id);
          this._meta.setInitial();
        }
      });

      return randomId;
    } catch (error: any) {
      runInAction(() => {
        this._meta.setError(this._apiRequest.error);
      });
      throw new Error(`getAllRecipes: ${error.message}`);
    }
  };

  private _onParamsUpdate = ({
    query,
    typesOptions,
    results,
  }: {
    query?: string;
    typesOptions?: Option[];
    results?: string;
  }) => {
    const q = query?.trim().toLocaleLowerCase();
    const types = typesOptions?.map((type) => type.key);

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

    if (didSearchUpdate) {
      this.setRecipes([]);
      this._currentOffset = 0;
    }

    this._updateResultsCount(didSearchUpdate, results);
  };

  private _updateResultsCount = (didSearchUpdate: boolean, results?: string) => {
    // on page reload
    if (didSearchUpdate && !!results) {
      this._loadNext = Number(results);
      this._queryStore.setParams({ results });
    }

    // on filtration and search
    if (didSearchUpdate && !results) {
      this._loadNext = this.requestItemsNumber;
      this._queryStore.setParams({ results: String(this.requestItemsNumber) });
    }

    // on page scroll
    if (!didSearchUpdate && !!results) {
      this._currentOffset = Number(results);
      this._loadNext = this.requestItemsNumber;
      this._queryStore.setParams({
        results: String(Number(results) + this.requestItemsNumber),
      });
    }
  };
}

export default RecipesStore;
