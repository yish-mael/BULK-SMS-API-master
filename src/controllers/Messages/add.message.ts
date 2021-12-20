import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { ProcessingSuccess } from '../../RequestStatus/status';
import models from '../../models';
import { MessageProps } from '../../Types/interfaces';
import MessageStatus, {
  ACCOUNT_TYPE,
  Entities,
  EntitiesAction,
} from '../../constants/enums';

export default async function Createmessage(
  req: Request,
  res: Response,
) {
  const { contacts, message, sender, groupId, scheduleDate } =
    req.body as {
      message: string;
      sender: string;
      groupId: string;
      contacts: string[];
      scheduleDate: any;
    };

  const $GROUPID = Types.ObjectId(groupId);

  const newMessage = (await new models.Message()) as MessageProps;

  // ACTIVITY LOGGER
  // ===============================================
  const Activity = new models.Activities({
    group: groupId,
    userType: ACCOUNT_TYPE.AGENCY_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.MESSAGES,
    type: EntitiesAction.CREATE,
    description: 'New message created',
    payload: {
      message,
      phoneNumbers: contacts,
      id: newMessage._id, // eslint-disable-line
    },
    date: new Date(),
  });

  newMessage.contacts.push(...contacts);
  newMessage.message = message;
  newMessage.sender = sender;
  newMessage.scheduleDate = new Date(scheduleDate);
  newMessage.groupId = $GROUPID;
  newMessage.date = new Date();
  newMessage.status = scheduleDate
    ? MessageStatus.APPROVED
    : MessageStatus.PENDING;

  await newMessage.save({ validateBeforeSave: false });
  await Activity.save({ validateBeforeSave: false });
  return ProcessingSuccess(res, newMessage);
}
