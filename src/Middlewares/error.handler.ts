import { Response, NextFunction } from 'express';
// import Loggers, { TestLogger } from '../Logger';
import { ProcessingError } from '../RequestStatus/status';
// import app from '../index';

export default async function ErrorHandler(
  err: any,
  req: any, // eslint-disable-line
  res: Response, // eslint-disable-line,
  next: NextFunction, // eslint-disable-line
) {
  console.log(err);
  // if (app.get('env') === 'production') {
  //   Loggers.error(err.message);
  // }

  // if (app.get('env') === 'test') {
  //   TestLogger.error(err.message);
  // }
  return ProcessingError(res);
}
