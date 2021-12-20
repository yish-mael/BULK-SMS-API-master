import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { ProcessingSuccess } from '../../RequestStatus/status';
import models from '../../models';
import { ContactGroupProps } from '../../Types/interfaces';
import {
  ACCOUNT_TYPE,
  Entities,
  EntitiesAction,
} from '../../constants/enums';
import { RemoveDuplicate } from '../../utills/utills';

export default async function UpdateContact(
  req: Request,
  res: Response,
) {
  const { id, updates } = req.body as {
    id: string;
    updates: ContactGroupProps;
  };
  const ID = Types.ObjectId(id);
  const contactsIDs = [] as Types.ObjectId[];
  if (updates.contacts) {
    const newContactInGroup = RemoveDuplicate(
      updates.contacts as any[],
    );
    newContactInGroup.forEach((ids) => {
      contactsIDs.push(Types.ObjectId(ids as any));
    });
    // @ts-ignore
    delete updates.contacts;
  }
  const doc = await models.ContactGroup.findOneAndUpdate(
    { _id: ID },
    {
      ...updates,
      contacts: contactsIDs,
    },
    { new: true },
  ).populate('contacts');

  // ACTIVITY LOGGER
  // ============================

  const Activity = new models.Activities({
    group: res.locals.groupId,
    userType: ACCOUNT_TYPE.AGENCY_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.CONTACTS_GROUP,
    type: EntitiesAction.UPDATE,
    description: 'Contact-group updated',
    payload: {
      name: doc?.name,
      id: doc?._id, // eslint-disable-line
    },
    date: new Date(),
  });

  await Activity.save({ validateBeforeSave: false });

  return ProcessingSuccess(res, doc);
}
