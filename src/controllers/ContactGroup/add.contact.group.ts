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

export default async function CreateContactGroup(
  req: Request,
  res: Response,
) {
  const { name, groupId } = req.body as {
    groupId: string;
    name: string;
  };

  const $UID = Types.ObjectId(groupId);
  const contactGroup = new models.ContactGroup() as ContactGroupProps;

  // ACTIVITY LOGGER
  // ===============================================
  const Activity = new models.Activities({
    group: groupId,
    userType: ACCOUNT_TYPE.AGENCY_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.CONTACTS_GROUP,
    type: EntitiesAction.CREATE,
    description: 'New contact-group created',
    payload: {
      name,
      id: contactGroup._id, // eslint-disable-line
    },
    date: new Date(),
  });

  contactGroup.name = name;
  contactGroup.groupId = $UID;

  await contactGroup.save({ validateBeforeSave: false });
  await Activity.save({ validateBeforeSave: false });

  const createdContact = await models.ContactGroup.findOne({
    _id: contactGroup._id, // eslint-disable-line
  });
  return ProcessingSuccess(res, createdContact);
}
