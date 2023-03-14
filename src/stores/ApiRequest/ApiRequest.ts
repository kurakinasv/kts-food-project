import axios, { AxiosError, CanceledError, HttpStatusCode, isAxiosError } from 'axios';
import { action, makeAutoObservable, observable, runInAction } from 'mobx';

import { ErrorResponse } from '@typings/meta';

type ApiResponse<T> = {
  data: T;
  status: HttpStatusCode;
};

type PrivateFields = '_controller' | '_error' | '_setError' | '_throwError';

class ApiRequest {
  private _controller: AbortController | null = null;
  private _error: ErrorResponse | null = null;

  constructor() {
    makeAutoObservable<ApiRequest, PrivateFields>(this, {
      _controller: observable.ref,
      _error: observable.ref,
      _setError: action,
      _throwError: action,
    });
  }

  get error() {
    return this._error;
  }

  private _setError = (err: ErrorResponse | null) => {
    this._error = err;
  };

  request = async <T>(url: string) => {
    if (this._controller !== null) {
      this._controller.abort('Controller is not null');
      this._controller = null;
    }

    this._controller = new AbortController();

    try {
      const response: ApiResponse<T> = await axios.get(url, { signal: this._controller.signal });

      runInAction(() => {
        if (this._controller && this._controller.signal.aborted) {
          return;
        }

        if (!response.data) {
          throw new Error('Error while fetching data');
        }

        this._controller = null;
      });

      return response.data;
    } catch (error: AxiosError | unknown) {
      if (error instanceof CanceledError) {
        return;
      }

      if (isAxiosError(error) && error.response) {
        const res = error.response;

        if (res.status === 401) {
          this._throwError('Not relevant API key', 401);
        }

        this._throwError(res.data.message, res.data.code);
      }

      if (error instanceof Error) {
        this._throwError(error.message);
      }

      this._throwError(`Unknown error: ${error}`);
    }
  };

  private _throwError = (message: string, code: HttpStatusCode = 404): Error => {
    this._setError({ message, code });
    throw new Error(message);
  };
}

export default ApiRequest;
