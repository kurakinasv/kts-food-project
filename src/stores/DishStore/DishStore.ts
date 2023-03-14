import { makeAutoObservable, observable, reaction, runInAction } from 'mobx';

import { ILocalStore } from '@hooks/useLocalStore';
import { mock, mockSimilar } from '@pages/DishPage/mock';
import ApiRequest from '@stores/ApiRequest';
import {
  CollectionModel,
  getInitialCollection,
  linearizeCollection,
  normalizeCollection,
} from '@stores/models/shared';
import {
  normalizeSimilarRecipe,
  SimilarRecipeApi,
  SimilarRecipeModel,
} from '@stores/models/similarRecipe';
import { rootStore } from '@stores/RootStore';
import { SingleRecipePaths } from '@typings/api';
import { UniqueId } from '@typings/common';
import { getSingleRecipeUrl } from '@utils/getUrl';

import { IDishStore, ExtendedDishModel, ExtendedDishApi, normalizeDish } from './model';

type PrivateFields = '_dishInfo' | '_meta' | '_similar';

class DishStore implements IDishStore, ILocalStore {
  private readonly _apiRequest = new ApiRequest();

  private _dishInfo: ExtendedDishModel | null = null;
  private _similar: CollectionModel<UniqueId, SimilarRecipeModel> = getInitialCollection();

  constructor() {
    makeAutoObservable<DishStore, PrivateFields>(this, {
      _meta: false,
      _dishInfo: observable.ref,
      _similar: observable.ref,
    });
  }

  private get _meta() {
    return rootStore.metaStore;
  }

  get dishInfo() {
    return this._dishInfo;
  }

  get similar(): SimilarRecipeModel[] {
    return linearizeCollection(this._similar);
  }

  setDishInfo = (info: ExtendedDishModel | null) => {
    this._dishInfo = info;
  };

  setSimilar = (similar: SimilarRecipeModel[]) => {
    this._similar = normalizeCollection(similar, (item) => item.id);
  };

  getDish = async (id: UniqueId) => {
    this._meta.setLoading();
    const url = getSingleRecipeUrl(id);

    try {
      const data = await this._apiRequest.request<ExtendedDishApi>(url);

      runInAction(() => {
        if (data) {
          this.setDishInfo(normalizeDish(data));
        }
      });
    } catch (error: any) {
      runInAction(() => {
        this._meta.setError(this._apiRequest.error);
      });
      throw new Error(`getDish: ${error.message}`);
    }
    runInAction(() => {
      this._meta.setInitial();
    });
  };

  getSimilar = async (id: UniqueId) => {
    this._meta.setLoading();
    const url = getSingleRecipeUrl(id, SingleRecipePaths.similar, { number: '5' });

    try {
      const data = await this._apiRequest.request<SimilarRecipeApi[]>(url);

      runInAction(() => {
        if (data) {
          this.setSimilar(data.map(normalizeSimilarRecipe));
        }
      });
    } catch (error: any) {
      runInAction(() => {
        this._meta.setError(this._apiRequest.error);
      });
      throw new Error(`getDish: ${error.message}`);
    }
    runInAction(() => {
      this._meta.setInitial();
    });
  };

  private _additionalRecipesReaction = reaction(
    () => this.similar,
    async (similar) => {
      const ids = similar.map(({ id }) => id);
      await rootStore.recipesStore.getSomeRecipes(ids);
    }
  );

  destroy = () => {
    runInAction(() => {
      this.setDishInfo(null);
      this._meta.setInitial();
    });
    this._additionalRecipesReaction();
  };
}

export default DishStore;
