import { makeAutoObservable } from 'mobx';

import { Meta } from '@typings/meta';

type PrivateFields = '_currentState' | '_errorMessage';

class MetaStore {
  private _currentState = Meta.initial;
  private _errorMessage = '';

  constructor() {
    makeAutoObservable<MetaStore, PrivateFields>(this);
  }

  get loading() {
    return this._currentState === Meta.loading;
  }

  get error() {
    return this._currentState === Meta.error;
  }

  get errorMessage() {
    return this._errorMessage;
  }

  setLoading = () => {
    this._currentState = Meta.loading;
  };

  setError = (message?: string) => {
    this._currentState = Meta.error;

    if (message) {
      this._errorMessage = message;
    }
  };

  setInitial = () => {
    this._currentState = Meta.initial;
  };
}

export default MetaStore;
