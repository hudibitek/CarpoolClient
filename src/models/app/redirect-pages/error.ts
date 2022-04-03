import { HttpStatusCodes } from 'core/models/web/http-status-codes';

export interface IError {
  title: string;
  message: string;
  httpStatus?: HttpStatusCodes;
  isSignInError?: boolean;
}
