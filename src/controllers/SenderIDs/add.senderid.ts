import { Request, Response } from 'express';
import { ProcessingSuccess } from '../../RequestStatus/status';
import models from '../../models';
import { SenderIds } from '../../Types/interfaces';
import {
  ACCOUNT_TYPE,
  Entities,
  EntitiesAction,
} from '../../constants/enums';

export default async function CreateSenderID(
  req: Request,
  res: Response,
) {
  const { name } = req.body as {
    name: string;
    senderIds: any[];
  };

  const senderID = new models.SenderIDs() as SenderIds;
  // ACTIVITY LOGGER
  // ===============================================
  const Activity = new models.Activities({
    group: '',
    userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.SENDERIDS,
    type: EntitiesAction.CREATE,
    description: 'New sender ID created',
    payload: {
      name,
      id: senderID._id, // eslint-disable-line
    },
    date: new Date(),
  });

  senderID.name = name;

  await senderID.save({
    validateBeforeSave: false,
  });
  await Activity.save({ validateBeforeSave: false });

  return ProcessingSuccess(res, senderID);
}
