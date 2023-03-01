import { makeAutoObservable } from 'mobx';

import { searchParams } from '@config/api';
import RootStore from '@stores/RootStore';
import { ParamsMapType, SearchParamsNames, SearchParamsType } from '@typings/api';

type PrivateFields = '_rootStore' | '_params';

class QueryStore {
  private _rootStore: RootStore;
  private _params: Partial<SearchParamsType> | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable<QueryStore, PrivateFields>(this);
    this._rootStore = rootStore;
  }

  get query() {
    return this._params?.query?.toString() || '';
  }

  get type() {
    return this._params?.type?.toString() || '';
  }

  getParams = () => {
    if (!this._params) {
      return [];
    }

    // converting to key-value array
    const paramsMapArray: ParamsMapType<SearchParamsNames> = Object.entries(this._params).reduce(
      (acc, param) => {
        const paramKey = param[0] as SearchParamsNames;

        if (searchParams.includes(paramKey)) {
          const key = paramKey;
          return [...acc, [key, param[1]]];
        }

        return [...acc];
      },
      [] as ParamsMapType<SearchParamsNames>
    );

    return paramsMapArray;
  };

  setParams = (params: Partial<SearchParamsType>) => {
    if (this._params) {
      this._params = { ...this._params, ...params };
    } else {
      this._params = params;
    }
  };
}

export default QueryStore;
