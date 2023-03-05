import axios, { AxiosError, HttpStatusCode, isAxiosError } from 'axios';

import { ErrorResponse } from '@typings/meta';

type ApiResponse<T> = {
  data: T;
  status: HttpStatusCode;
};

class ApiRequest {
  private controller: AbortController | null = null;
  private _error: ErrorResponse | null = null;

  get error() {
    return this._error;
  }

  private _setError = (err: ErrorResponse | null) => {
    this._error = err;
  };

  request = async <T>(url: string) => {
    if (this.controller !== null) {
      this.controller.abort('Controller is not null');
      this.controller = null;
    }

    this.controller = new AbortController();

    try {
      const response: ApiResponse<T> = await axios.get(url, { signal: this.controller.signal });

      if (this.controller.signal.aborted) {
        return;
      }

      if (!response.data) {
        throw new Error('Error while fetching data');
      }

      // todo delete
      console.log('request data:', response.data);
      this.controller = null;

      return response.data;
    } catch (error: AxiosError | unknown) {
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
