import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { ProcessingSuccess } from '../../RequestStatus/status';
import models from '../../models';
import { SenderIds } from '../../Types/interfaces';
import {
  ACCOUNT_TYPE,
  Entities,
  EntitiesAction,
} from '../../constants/enums';

export default async function UpdateSenderId(
  req: Request,
  res: Response,
) {
  const { id, updates } = req.body as {
    id: string;
    updates: SenderIds;
  };
  const ID = Types.ObjectId(id);

  const doc = await models.SenderIDs.findOneAndUpdate(
    { _id: ID },
    updates,
    { new: true },
  );

  // ACTIVITY LOGGER
  // ============================

  const Activity = new models.Activities({
    group: '',
    userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.SENDERIDS,
    type: EntitiesAction.UPDATE,
    description: 'SenderId updated',
    payload: {
      name: doc?.name,
      id: doc?._id, // eslint-disable-line
    },
    date: new Date(),
  });

  await Activity.save();

  return ProcessingSuccess(res, doc);
}
