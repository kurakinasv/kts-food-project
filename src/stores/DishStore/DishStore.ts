import axios from 'axios';
import { makeAutoObservable } from 'mobx';

import { getSingleRecipeUrl } from '@utils/getUrl';

import { IDishStore, ExtendedDishApiType, ExtendedDishType, normalizeDish } from './model';

type ErrorResponseType = {
  message: string;
  isError: boolean;
};

class DishStore implements IDishStore {
  public dishInfo: ExtendedDishType | null = null;
  public error: ErrorResponseType | null = {
    message: '',
    isError: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setDishInfo = (info: ExtendedDishType) => {
    this.dishInfo = info;
  };

  setError = (err: ErrorResponseType) => {
    this.error = err;
  };

  getDish = async (id: number) => {
    const url = getSingleRecipeUrl(id);

    try {
      const response: { data: ExtendedDishApiType; status: number } = await axios.get(url);

      if (!response.data) {
        // todo get error message
        throw new Error('Error while handling request');
      }

      console.log('getDish', response.data);

      this.setDishInfo(normalizeDish(response.data));
      // todo configure error type
    } catch (error: any) {
      this.setError({ isError: true, message: error.message });
      throw new Error('getDish', error.message);
    }
  };
}

export default DishStore;
