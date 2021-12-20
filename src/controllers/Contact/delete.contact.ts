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

export async function DeleteContact(req: Request, res: Response) {
  const { id } = req.params;

  const doc = await models.Contact.findOneAndDelete({ _id: id });
  if (!doc)
    return ResourceNotFound(
      res,
      constants.RequestResponse.ContactNotFoundWithId,
    );
  // ACTIVITY LOGGER
  // ============================

  const Activity = new models.Activities({
    group: res.locals.groupId,
    userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.CONTACTS,
    type: EntitiesAction.DELETE,
    description: 'Contact deleted',
    payload: {
      name: doc?.name,
      phoneNumber: doc?.number,
      id: doc?._id, // eslint-disable-line
    },
    date: new Date(),
  });

  await Activity.save();

  return ProcessingSuccess(res, doc);
}

export async function DeleteMultipleContacts(
  req: Request,
  res: Response,
) {
  const { contactIds } = req.body as {
    contactIds: string[];
  };
  const formatIds: Types.ObjectId[] = [];
  contactIds.forEach((id: string) => {
    formatIds.push(Types.ObjectId(id));
  });

  // FIND ALL CONTACT ACCOUNT SELECTED TO BE DELETED
  const contacts = await models.Contact.find({
    _id: { $in: formatIds }, // eslint-disable-line
  });

  // ACTIVITY LOGGER
  // ===============================================
  const DeletedContacts: any[] = []; // HOLD ACTIVITY LOG FOR EACH ACCOUNT DELETED
  // eslint-disable-next-line
  for (let contact of contacts) {
    // eslint-disable-next-line

    DeletedContacts.push({
      group: res.locals.groupId,
      userType: ACCOUNT_TYPE.AGENCY_ACCOUNT,
      admin: res.locals.id, // eslint-disable-line
      user: res.locals.id,
      entity: Entities.CONTACTS,
      type: EntitiesAction.DELETE,
      description: 'Contacts deleted',
      payload: {
        name: contact?.name,
        phoneNumber: contact?.number,
        id: contact?._id, // eslint-disable-line
      },
      date: new Date(),
    });
  }
  const Activity = new models.Activities(); // CREATE A NEW ACTIVITY OBJECT

  /* eslint-enable */

  const doc = await models.Contact.deleteMany({
    _id: { $in: formatIds },
  });
  // INSERT ALL ACTIVITIES
  // ======================
  await Activity.collection.insertMany(DeletedContacts);
  return ProcessingSuccess(res, doc);
}
