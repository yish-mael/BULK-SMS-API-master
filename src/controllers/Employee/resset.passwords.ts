import { Request, Response } from 'express';
import { Types } from 'mongoose';
import {
  ProcessingSuccess,
  UserDoesNotExist,
} from '../../RequestStatus/status';
import models from '../../models';
import { EmployeeSignupProps } from '../../Types/interfaces';
import {
  ACCOUNT_TYPE,
  Entities,
  EntitiesAction,
} from '../../constants/enums';
import {
  getTokens,
  sendRessetPasswordLink,
} from '../../utills/utills';

export default async function RequestRessetEmail(
  req: Request,
  res: Response,
) {
  const { email } = req.body as EmployeeSignupProps;

  // CHECKS IF ACCOUNT ALREADY EXIST
  const findAccount = await models.Employee.findOne(
    {
      email: email.toLowerCase(),
    },
    {
      hash: 0,
      salt: 0,
    },
  );

  if (!findAccount) return UserDoesNotExist(res);
  const $findAccount = findAccount.toObject();
  const { accessToken } = getTokens({
    ...$findAccount,
  } as any);

  await sendRessetPasswordLink(accessToken, {
    isAdmin: false,
    name: findAccount.name,
    email,
  });

  const Activity = new models.Activities({
    group: res.locals.groupId,
    userType: ACCOUNT_TYPE.AGENCY_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.EMPLOYEES,
    type: EntitiesAction.PASSWORD_RESSET,
    description: 'Password request email sent to user account',
    payload: {
      name: findAccount.name,
      email: findAccount.email,
      id: findAccount._id, // eslint-disable-line
    },
    date: new Date(),
  });

  await Activity.save();

  return ProcessingSuccess(res, {});
}

export async function RessetPassword(req: Request, res: Response) {
  const { password } = req.body as EmployeeSignupProps;

  // CHECKS IF ACCOUNT ALREADY EXIST
  const findAccount = await models.Employee.findOne(
    {
      _id: Types.ObjectId(res.locals.id),
    },
    {
      hash: 0,
      salt: 0,
      email: 0,
    },
  );

  if (!findAccount) return UserDoesNotExist(res);

  findAccount.setPassword(password);

  const Activity = new models.Activities({
    group: res.locals.groupId,
    userType: ACCOUNT_TYPE.AGENCY_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.EMPLOYEES,
    type: EntitiesAction.PASSWORD_RESSET,
    description: 'Users password was resset successfully',
    payload: {
      name: findAccount.name,
      email: findAccount.email,
      id: findAccount._id, // eslint-disable-line
    },
    date: new Date(),
  });

  await Activity.save();
  await findAccount.save();

  return ProcessingSuccess(res, {});
}
