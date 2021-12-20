import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { ProcessingSuccess } from '../../RequestStatus/status';
import models from '../../models';
import { RoleProps } from '../../Types/interfaces';
import {
  ACCOUNT_TYPE,
  Entities,
  EntitiesAction,
} from '../../constants/enums';

export default async function UpdateRole(
  req: Request,
  res: Response,
) {
  const { id, updates } = req.body as {
    id: string;
    updates: RoleProps;
  };
  const ID = Types.ObjectId(id);

  const doc = await models.Role.findOneAndUpdate(
    { _id: ID },
    updates,
    {
      new: true,
    },
  );

  // ACTIVITY LOGGER
  // ============================

  const Activity = new models.Activities({
    group: '',
    userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.ROLES,
    type: EntitiesAction.UPDATE,
    description: 'Role updated',
    payload: {
      name: doc?.name,
      id: doc?._id, // eslint-disable-line
    },
    date: new Date(),
  });

  await Activity.save();

  return ProcessingSuccess(res, doc);
}
