import { makeAutoObservable } from 'mobx';

import { ErrorResponse, Meta } from '@typings/meta';

type PrivateFields = '_currentState' | '_errorMessage';

class MetaStore {
  private _currentState = Meta.initial;
  private _error: ErrorResponse | null = null;

  constructor() {
    makeAutoObservable<MetaStore, PrivateFields>(this);
  }

  get loading() {
    return this._currentState === Meta.loading;
  }

  get isError() {
    return this._currentState === Meta.error;
  }

  get error() {
    return this._error;
  }

  setLoading = () => {
    this._currentState = Meta.loading;
  };

  setError = (error: ErrorResponse | null) => {
    if (error === null) {
      this._currentState = Meta.initial;
    } else {
      this._currentState = Meta.error;
    }
    this._error = error;
  };

  setInitial = () => {
    this._currentState = Meta.initial;
    this._error = null;
  };
}

export default MetaStore;
