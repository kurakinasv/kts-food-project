import { makeAutoObservable, observable } from 'mobx';

import RootStore from '@stores/RootStore';

type PrivateFields = '_disableScroll';

class UIStore {
  private readonly _rootStore: RootStore;
  private _disableScroll = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable<UIStore, PrivateFields>(this, {
      _disableScroll: observable,
    });
    this._rootStore = rootStore;
  }

  get scrollDisabled() {
    return this._disableScroll;
  }

  setScrollDisabled = (disable: boolean) => {
    this._disableScroll = disable;
  };
}

export default UIStore;
