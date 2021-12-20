import { Request, Response } from 'express';
import { ProcessingSuccess } from '../../RequestStatus/status';
import models from '../../models';
import {
  ACCOUNT_TYPE,
  Entities,
  EntitiesAction,
} from '../../constants/enums';

export default async function CreateRole(
  req: Request,
  res: Response,
) {
  const {
    sendMessage,
    readMessage,
    name,
    addContact,
    composeMessage,
  } = req.body as {
    sendMessage: boolean;
    readMessage: boolean;
    name: string;
    addContact: boolean;
    composeMessage: boolean;
  };

  // const $UID = Types.ObjectId(groupId);
  const role = new models.Role();

  // ACTIVITY LOGGER
  // ===============================================
  const Activity = new models.Activities({
    group: '',
    userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.ROLES,
    type: EntitiesAction.CREATE,
    description: 'New Role created',
    payload: {
      name,
      id: role._id, // eslint-disable-line
    },
    date: new Date(),
  });

  role.name = name;
  role.sendMessage = sendMessage;
  role.readMessage = readMessage;
  role.addContact = addContact;
  role.composeMessage = composeMessage;

  await role.save({ validateBeforeSave: false });
  await Activity.save({ validateBeforeSave: false });
  return ProcessingSuccess(res, role);
}
