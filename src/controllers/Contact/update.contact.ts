import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { ProcessingSuccess } from '../../RequestStatus/status';
import models from '../../models';
import { ContactProps } from '../../Types/interfaces';
import {
  ACCOUNT_TYPE,
  Entities,
  EntitiesAction,
} from '../../constants/enums';

export default async function UpdateContact(
  req: Request,
  res: Response,
) {
  const { id, updates } = req.body as {
    id: string;
    updates: ContactProps;
  };
  const ID = Types.ObjectId(id);

  const doc = await models.Contact.findOneAndUpdate(
    { _id: ID },
    updates,
    { new: true },
  );

  // ACTIVITY LOGGER
  // ============================

  const Activity = new models.Activities({
    group: res.locals.groupId,
    userType: ACCOUNT_TYPE.AGENCY_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.CONTACTS,
    type: EntitiesAction.UPDATE,
    description: 'Contact updated',
    payload: {
      name: doc?.name,
      id: doc?._id, // eslint-disable-line
    },
    date: new Date(),
  });

  await Activity.save({ validateBeforeSave: false });

  return ProcessingSuccess(res, doc);
}
