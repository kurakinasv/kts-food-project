import { makeAutoObservable } from 'mobx';

import { mock } from '@pages/DishPage/mock';
import ApiRequest from '@stores/ApiRequest';
import MetaStore from '@stores/MetaStore';
import { getSingleRecipeUrl } from '@utils/getUrl';

import { IDishStore, ExtendedDishApiType, ExtendedDishType, normalizeDish } from './model';

type PrivateFields = '_meta' | '_dishInfo';

class DishStore implements IDishStore {
  private readonly _meta = new MetaStore();
  private readonly _apiRequest = new ApiRequest();

  private _dishInfo: ExtendedDishType | null = null;

  constructor() {
    makeAutoObservable<DishStore, PrivateFields>(this);
  }

  get meta() {
    return this._meta;
  }

  get dishInfo() {
    return this._dishInfo;
  }

  setDishInfo = (info: ExtendedDishType) => {
    this._dishInfo = info;
  };

  getDish = async (id: number) => {
    this._meta.setLoading();
    const url = getSingleRecipeUrl(id);

    try {
      const data = await this._apiRequest.request<ExtendedDishApiType>(url);

      // todo delete mock
      // const data = await new Promise<ExtendedDishType | null>((res) => {
      //   setTimeout(() => res(mock), 2000);
      // });

      if (data) {
        // this.setDishInfo(data);
        this.setDishInfo(normalizeDish(data));
      }
    } catch (error: any) {
      this._meta.setError(this._apiRequest.error);
      throw new Error(`getDish: ${error.message}`);
    }
    this._meta.setInitial();
  };
}

export default DishStore;
