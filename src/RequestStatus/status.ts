import { Response } from 'express';
import STATUS_CODES from './codes';
import Constants from '../constants/index';
import { UserProps } from '../Types/interfaces';

// LOGIN SUCCESS
export const LoginSuccess = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  user: UserProps,
) => {
  res.status(STATUS_CODES.OK.CODE).json({
    statusText: STATUS_CODES.OK.STATUS_TEXT,
    message: Constants.RequestResponse.LoginSuccess,
    payload: {
      accessToken,
      refreshToken,
      user,
    },
  });
};

// INVALID CREDENTIALS
export const InvalidCredential = (res: Response) => {
  res.status(STATUS_CODES.FORBIDDEN.CODE).json({
    message: Constants.Validations.INVALID_CREDENTIALS,
    error: Constants.RequestResponse.InvalidCredential,
  });
};

// INVALID CREDENTIALS
export const RequestForbidden = (res: Response, message: string) => {
  res.status(STATUS_CODES.FORBIDDEN.CODE).json({
    message,
    error: Constants.RequestResponse.InvalidCredential,
  });
};

// SUSPENDS USER
export const SuspendUser = (res: Response) => {
  res.status(STATUS_CODES.FORBIDDEN.CODE).json({
    message: Constants.Validations.USER_SUSPENDED,
    error: Constants.RequestResponse.UserSuspended,
  });
};

// Max pin exceeded by USER
export const MaxPinTrialExceeded = (res: Response) => {
  res.status(STATUS_CODES.FORBIDDEN.CODE).json({
    message: Constants.Validations.MAX_PIN_TRIAL,
    error: Constants.RequestResponse.MAX_TRIALS_EXCEEDED,
  });
};

// last pin request not timout for USER
export const LastPinNotTimout = (res: Response) => {
  res.status(STATUS_CODES.FORBIDDEN.CODE).json({
    message: Constants.Validations.PIN_NOT_TIMED_OUT,
    error: Constants.RequestResponse.PinNotTimeOut,
  });
};

// INVALID PASSWORD
export const InvalidPassword = (res: Response) => {
  res.status(STATUS_CODES.UNAUTHORIZED.CODE).json({
    message: Constants.Validations.INCORRECT_PASSWORD,
    error: Constants.RequestResponse.InvalidPassword,
  });
};

// SIGN UP STATUS
export const SignUpSuccess = (res: Response, payload: any) => {
  res.status(STATUS_CODES.OK.CODE).json({
    statusText: STATUS_CODES.OK.STATUS_TEXT,
    message: Constants.RequestResponse.SignUpSuccess,
    payload,
  });
};

// signup Failure
export const UserExist = (res: Response) => {
  res.status(STATUS_CODES.CONFLICT.CODE).json({
    message: Constants.Validations.USER_EXIST,
    error: Constants.RequestResponse.UserExist,
  });
};

// VALIDATING INPUT
export const InvalidInputs = (res: Response, message?: string) => {
  res.status(STATUS_CODES.BAD_REQUEST.CODE).json({
    message,
    error: Constants.RequestResponse.InvalidInput,
  });
};

// PROCESSING ERROR
export const ProcessingError = (res: Response) => {
  res.status(STATUS_CODES.INTERNAL_SERVER_ERROR.CODE).json({
    message: Constants.Validations.SERVER_ERROR,
    error: Constants.RequestResponse.ServerError,
  });
};

// PROCESSING SUCCESS
export const ProcessingSuccess = (
  res: Response,
  data: any,
  extraPayload?: any,
) => {
  res.status(STATUS_CODES.OK.CODE).json({
    message: STATUS_CODES.OK.STATUS_TEXT,
    payload: data,
    extraPayload,
  });
};

// PROCESSING SUCCESS
export const ProcessingGetRequestSuccess = (
  res: Response,
  data: any,
) => {
  res.status(STATUS_CODES.OK.CODE).json({
    message: STATUS_CODES.OK.STATUS_TEXT,
    ...data,
  });
};
// AUTH

// UNAUTHORIZED
export const UnAuthorized = (res: Response) => {
  res.status(STATUS_CODES.UNAUTHORIZED.CODE).json({
    error: Constants.RequestResponse.UnAuthorizedRequest,
    message: Constants.Validations.UNAUTHORIZED,
  });
};

// resource created
export const ResourceCreated = (res: Response, data: any) => {
  res.status(STATUS_CODES.CREATED.CODE).json({
    message: STATUS_CODES.CREATED.STATUS_TEXT,
    payload: data,
  });
};

// invalid Account
export const UnVerifiedAccount = (res: Response) => {
  res.status(STATUS_CODES.INVALID_ACCOUNT.CODE).json({
    message: Constants.Validations.UNVERIFIED_ACCOUNT,
    error: Constants.RequestResponse.AccountNotVerified,
  });
};

export const VerificationStatusError = (
  res: Response,
  message: string,
) => {
  res.status(STATUS_CODES.UNAUTHORIZED.CODE).json({
    error: Constants.RequestResponse.UnAuthorizedRequest,
    message,
  });
};

export const ResourceNotFound = (res: Response, message: string) => {
  res.status(STATUS_CODES.NOT_FOUND.CODE).json({
    error: Constants.RequestResponse.NotFound,
    message,
  });
};

export const UserDoesNotExist = (res: Response) => {
  res.status(STATUS_CODES.NOT_FOUND.CODE).json({
    message: Constants.Validations.USER_NOT_EXIST,
    error: Constants.RequestResponse.UserNotFound,
  });
};

export const RequestNotAllowed = (res: Response) => {
  res.status(STATUS_CODES.CONFLICT.CODE).json({
    message: Constants.Validations.REQUEST_NOT_ALLOWED,
    error: Constants.RequestResponse.REQUEST_NOT_ALLOWED,
  });
};
