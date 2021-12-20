import { Request, Response } from 'express';
import { Types } from 'mongoose';
import {
  ProcessingSuccess,
  ResourceNotFound,
} from '../../RequestStatus/status';
import models from '../../models';
import constants from '../../constants';
import {
  ACCOUNT_TYPE,
  Entities,
  EntitiesAction,
} from '../../constants/enums';

export async function DeleteSenderId(req: Request, res: Response) {
  const { id } = req.params;

  const doc = await models.SenderIDs.findOneAndDelete({ _id: id });
  if (!doc)
    return ResourceNotFound(
      res,
      constants.RequestResponse.ContactNotFoundWithId,
    );
  // ACTIVITY LOGGER
  // ============================

  const Activity = new models.Activities({
    group: '',
    userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.SENDERIDS,
    type: EntitiesAction.DELETE,
    description: 'SenderId deleted',
    payload: {
      name: doc?.name,
      id: doc?._id, // eslint-disable-line
    },
    date: new Date(),
  });

  await Activity.save();

  return ProcessingSuccess(res, doc);
}

export async function DeleteMultipleSenders(
  req: Request,
  res: Response,
) {
  const { senderIds } = req.body as {
    senderIds: string[];
  };
  const formatIds: Types.ObjectId[] = [];
  senderIds.forEach((id: string) => {
    formatIds.push(Types.ObjectId(id));
  });

  const DeletedSenderIds: any[] = [];

  const $senderIds = await models.SenderIDs.find({
    _id: { $in: formatIds }, // eslint-disable-line;
  });
  // eslint-disable-next-line
  for (let senderId of $senderIds) {
    // eslint-disable-next-line

    DeletedSenderIds.push({
      group: '',
      userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
      admin: res.locals.id, // eslint-disable-line
      user: res.locals.id,
      entity: Entities.SENDERIDS,
      type: EntitiesAction.DELETE,
      description: 'SenderId  deleted',
      payload: {
        name: senderId?.name,
        id: senderId?._id, // eslint-disable-line
      },
      date: new Date(),
    });
  }
  const Activity = new models.Activities();

  const doc = await models.SenderIDs.deleteMany({
    _id: { $in: formatIds },
  });

  await Activity.collection.insertMany(DeletedSenderIds);

  return ProcessingSuccess(res, doc);
}
