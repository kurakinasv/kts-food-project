import { action, computed, makeAutoObservable, observable, runInAction } from 'mobx';

import ApiRequest from '@stores/ApiRequest';
import { DishFullInfoApi, DishWithNutritionApi, DishWithNutritionModel } from '@stores/DishStore';
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

import { IRecipesStore, normalizeRecipe, RecipesApi } from './model';

type PrivateFields =
  | '_rootStore'
  | '_meta'
  | '_recipes'
  | '_currentOffset'
  | '_mealTypes'
  | '_onParamsUpdate'
  | '_paramsToSearch';

class RecipesStore implements IRecipesStore {
  private readonly _rootStore: RootStore;
  private readonly _queryStore: QueryStore;

  private readonly _apiRequest = new ApiRequest();

  private readonly requestItemsNumber = 25;

  private _recipes: CollectionModel<UniqueId, DishWithNutritionModel> = getInitialCollection();
  private _additionalRecipes: CollectionModel<UniqueId, DishWithNutritionModel> =
    getInitialCollection();

  private _currentOffset = 0;
  private _loadNext = this.requestItemsNumber;
  public totalResults: null | number = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable<RecipesStore, PrivateFields>(this, {
      _rootStore: false,
      _meta: false,
      _recipes: observable.ref,
      _currentOffset: observable,
      _mealTypes: computed,
      _paramsToSearch: computed,
      _onParamsUpdate: action,
    });
    this._rootStore = rootStore;
    this._queryStore = this._rootStore.queryStore;
  }

  get recipes(): DishWithNutritionModel[] {
    return linearizeCollection(this._recipes);
  }

  get additionalRecipes() {
    return this._additionalRecipes;
  }

  get recipesCollection() {
    return this._recipes;
  }

  private get _meta() {
    return this._rootStore.metaStore;
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
    this._recipes = normalizeCollection(recipes, (recipe) => recipe.id);
  };

  setAdditionalRecipes = (recipes: DishWithNutritionModel[]) => {
    this._additionalRecipes = normalizeCollection(recipes, (recipe) => recipe.id);
  };

  getAllRecipes = async (query?: string, typesOptions?: Option[], page?: string) => {
    this._meta.setLoading();
    this._onParamsUpdate({ query, typesOptions, page });

    const url = getAllRecipesUrl(AllRecipesPaths.complex, this._paramsToSearch);

    try {
      const data = await this._apiRequest.request<RecipesApi>(url);

      runInAction(() => {
        if (data) {
          this.setRecipes([...this.recipes, ...data.results.map(normalizeRecipe)]);
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
    this._meta.setCurrentRequest('random');
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
      throw new Error(`getRandom: ${error.message}`);
    }
  };

  getSomeRecipes = async (ids: UniqueId[]) => {
    this._meta.setLoading();

    const url = getAllRecipesUrl(AllRecipesPaths.bulk, {
      ids: ids.join(','),
      includeNutrition: 'true',
    });

    try {
      const data = await this._apiRequest.request<DishWithNutritionApi[]>(url);

      runInAction(() => {
        if (data) {
          this.setAdditionalRecipes(data.map(normalizeRecipe));
          this._meta.setInitial();
        }
      });
    } catch (error: any) {
      runInAction(() => {
        this._meta.setError(this._apiRequest.error);
      });
      throw new Error(`getSomeRecipes: ${error.message}`);
    }
  };

  private _onParamsUpdate = ({
    query,
    typesOptions,
    page,
  }: {
    query?: string;
    typesOptions?: Option[];
    page?: string;
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
    } else {
      this._currentOffset = Number(this.recipes.length);
    }

    this._updatePageCount(didSearchUpdate, page);
  };

  private _updatePageCount = (didSearchUpdate: boolean, page?: string) => {
    // on non valid page value
    if (isNaN(Number(page)) || Number(page) < 0) {
      this._loadNext = this.requestItemsNumber;
      this._queryStore.setParams({ page: '' });
      return;
    }

    // on page reload
    if (didSearchUpdate && !!page) {
      this._loadNext = Number(page) * this.requestItemsNumber;
      this._queryStore.setParams({ page });
      return;
    }

    // on filtration and search
    if (didSearchUpdate && !page) {
      this._loadNext = this.requestItemsNumber;
      this._queryStore.setParams({ page: '' });
      return;
    }

    // on page scroll
    if (!didSearchUpdate && page !== undefined) {
      this._loadNext = this.requestItemsNumber;

      const pageValue = page === '' ? 1 : Number(page);
      this._queryStore.setParams({ page: String(pageValue + 1) });
      return;
    }
  };
}

export default RecipesStore;
