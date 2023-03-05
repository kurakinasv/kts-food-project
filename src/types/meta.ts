import { HttpStatusCode } from 'axios';

export enum Meta {
  initial = 'initial',
  loading = 'loading',
  error = 'error',
}

export type ErrorResponse = {
  message: string;
  code: HttpStatusCode;
};
