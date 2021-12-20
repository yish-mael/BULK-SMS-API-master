import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import models from '../../models';
import { UnAuthorized } from '../../RequestStatus/status';
import { RoleProps } from '../../Types/interfaces';

export default async function ValidateAccessToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userId = res.locals.id;
  const user = await models.Employee.findOne({
    _id: Types.ObjectId(userId), // eslint-disable-line
  }).populate('roleId');
  const role = user?.roleId as any as RoleProps;
  if (role.composeMessage) {
    return next();
  }
  return UnAuthorized;
}
