import { Request, Response } from 'express';
import { ProcessingSuccess } from '../../RequestStatus/status';
import models from '../../models';
import {
  ACCOUNT_TYPE,
  Entities,
  EntitiesAction,
} from '../../constants/enums';

export default async function CreateContact(
  req: Request,
  res: Response,
) {
  const { contacts } = req.body;

  const contactNumbers = contacts.map(
    (contact: any) => contact.number,
  );

  const getAllContacts = await models.Contact.find({
    number: { $in: contactNumbers },
  });

  const existingContacts = getAllContacts.map(
    (existingContact) => existingContact.number,
  );
  const contactsToAdd = contacts.filter(
    (contact: any) => existingContacts.indexOf(contact.number) === -1,
  );

  const docs = await models.Contact.insertMany(contactsToAdd as any);

  const Activities = [] as any[];

  docs.forEach((document) => {
    Activities.push({
      group: document.groupId,
      userType: ACCOUNT_TYPE.AGENCY_ACCOUNT,
      admin: res.locals.id, // eslint-disable-line
      user: res.locals.id,
      entity: Entities.CONTACTS,
      type: EntitiesAction.CREATE,
      description: 'New contact created',
      payload: {
        name: document.name,
        phoneNumber: document.number,
        id: document._id, // eslint-disable-line
      },
      date: new Date(),
    });
  });

  await models.Activities.insertMany(Activities);

  return ProcessingSuccess(res, docs, [...docs, ...getAllContacts]);
}
