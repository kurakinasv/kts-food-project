import { makeAutoObservable, observable, runInAction } from 'mobx';

import { ILocalStore } from '@hooks/useLocalStore';
import { mock } from '@pages/DishPage/mock';
import ApiRequest from '@stores/ApiRequest';
import { rootStore } from '@stores/RootStore';
import { getSingleRecipeUrl } from '@utils/getUrl';

import { IDishStore, ExtendedDishApi, ExtendedDishModel, normalizeDish } from './model';

type PrivateFields = '_dishInfo' | '_meta';

class DishStore implements IDishStore, ILocalStore {
  private readonly _apiRequest = new ApiRequest();

  private _dishInfo: ExtendedDishModel | null = null;

  constructor() {
    makeAutoObservable<DishStore, PrivateFields>(this, {
      _dishInfo: observable.ref,
      _meta: false,
    });
  }

  private get _meta() {
    return rootStore.metaStore;
  }

  get dishInfo() {
    return this._dishInfo;
  }

  setDishInfo = (info: ExtendedDishModel | null) => {
    this._dishInfo = info;
  };

  getDish = async (id: number) => {
    this._meta.setLoading();
    const url = getSingleRecipeUrl(id);

    try {
      const data = await this._apiRequest.request<ExtendedDishApi>(url);

      // todo delete mock
      // const data = await new Promise<ExtendedDishModel | null>((res) => {
      //   setTimeout(() => res(mock), 500);
      // });

      runInAction(() => {
        if (data) {
          // this.setDishInfo(data);
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

  destroy = () => {
    runInAction(() => {
      this.setDishInfo(null);
      this._meta.setInitial();
    });
  };
}

export default DishStore;
