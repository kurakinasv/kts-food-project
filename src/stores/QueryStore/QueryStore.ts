import { makeAutoObservable, observable } from 'mobx';

import RootStore from '@stores/RootStore';
import { RecipesQueryParams, SearchParams } from '@typings/api';

type PrivateFields = '_params';

class QueryStore {
  private readonly _rootStore: RootStore;
  private _params: Partial<SearchParams<RecipesQueryParams>> | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable<QueryStore, PrivateFields>(this, {
      _params: observable.ref,
    });
    this._rootStore = rootStore;
  }

  get query() {
    return this._params?.query || '';
  }

  get type() {
    return this._params?.type || '';
  }

  getParams = () => {
    return this._params;
  };

  setParams = (params: Partial<SearchParams<RecipesQueryParams>>) => {
    if (this._params) {
      this._params = { ...this._params, ...params };
    } else {
      this._params = params;
    }
  };
}

export default QueryStore;
