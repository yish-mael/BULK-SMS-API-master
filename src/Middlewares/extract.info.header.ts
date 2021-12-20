import { NextFunction, Request, Response } from 'express';
import { UnAuthorized } from '../RequestStatus/status';
import { decodeJwtToken } from '../utills/utills';
import app from '../index';

export default async function ValidateAccessToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (app.get('env') === 'production') {
      const { authorization } = req.headers;
      const accessToken = authorization?.split(' ')[1];
      const access = decodeJwtToken(accessToken as any) as any; // throws error if not valid
      res.locals.id = access.userId._id; // eslint-disable-line
      res.locals.groupId = access.userId.groupId?._id; // eslint-disable-line
      return next();
    }
    next();
  } catch (e) {
    return UnAuthorized(res);
  }
}
