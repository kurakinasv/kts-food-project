import { makeAutoObservable, observable } from 'mobx';

import { themeStorageName } from '@config/storage';
import RootStore from '@stores/RootStore';
import { ThemesEnum } from '@styles/types';

type PrivateFields = '_disableScroll' | '_theme';

class UIStore {
  private readonly _rootStore: RootStore;
  private _disableScroll = false;
  private _theme: ThemesEnum = ThemesEnum.light;

  constructor(rootStore: RootStore) {
    makeAutoObservable<UIStore, PrivateFields>(this, {
      _disableScroll: observable,
      _theme: observable,
    });
    this._rootStore = rootStore;
  }

  get scrollDisabled() {
    return this._disableScroll;
  }

  get theme() {
    return this._theme;
  }

  setScrollDisabled = (disable: boolean) => {
    this._disableScroll = disable;
  };

  toggleTheme = () => {
    const themeToSet = this._theme === ThemesEnum.light ? ThemesEnum.dark : ThemesEnum.light;
    this._theme = themeToSet;
    localStorage.setItem(themeStorageName, themeToSet);
  };

  initTheme = () => {
    const theme = localStorage.getItem(themeStorageName);

    if (theme) {
      this._theme = theme === ThemesEnum.light ? ThemesEnum.light : ThemesEnum.dark;
      return;
    }

    if (matchMedia('(prefers-color-scheme: dark)')) {
      this._theme = ThemesEnum.dark;
      localStorage.setItem(themeStorageName, ThemesEnum.dark);
      return;
    }

    this._theme = ThemesEnum.light;
    localStorage.setItem(themeStorageName, ThemesEnum.light);
  };
}

export default UIStore;
