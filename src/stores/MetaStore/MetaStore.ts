import { makeAutoObservable, observable } from 'mobx';

import RootStore from '@stores/RootStore';
import { ErrorResponse, Meta, RequestNames } from '@typings/meta';

type PrivateFields = '_currentState' | '_error' | '_currentRequest';

class MetaStore {
  private readonly _rootStore: RootStore;
  private _currentState = Meta.initial;
  private _error: ErrorResponse | null = null;
  private _currentRequest: RequestNames | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable<MetaStore, PrivateFields>(this, {
      _currentState: observable,
      _error: observable.ref,
      _currentRequest: observable,
    });
    this._rootStore = rootStore;
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

  get currentRequest() {
    return this._currentRequest;
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
    this.setCurrentRequest(null);
  };

  setCurrentRequest = (req: RequestNames | null) => {
    this._currentRequest = req;
  };
}

export default MetaStore;
