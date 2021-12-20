import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { ProcessingSuccess } from '../../RequestStatus/status';
import models from '../../models';
import {
  ACCOUNT_TYPE,
  Entities,
  EntitiesAction,
} from '../../constants/enums';

export async function DeleteMessage(req: Request, res: Response) {
  const { id } = req.params;

  const deletedDoc = await models.Message.findOneAndDelete({
    _id: id,
  });

  // ACTIVITY LOGGER
  // ============================

  const Activity = new models.Activities({
    group: res.locals.groupId,
    userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.MESSAGES,
    type: EntitiesAction.DELETE,
    description: 'Message deleted',
    payload: {
      message: deletedDoc?.message,
      id: deletedDoc?._id, // eslint-disable-line
    },
    date: new Date(),
  });

  await Activity.save();
  // await models.Department.findOneAndUpdate(
  //   { _id: deletedDoc?.groupId },
  //   {
  //     $inc: { credit: deletedDoc?.contacts.length },
  //   },
  //   { new: true },
  // );

  return ProcessingSuccess(res, deletedDoc);
}

export async function DeleteMultipleMessage(
  req: Request,
  res: Response,
) {
  const { messageIds } = req.body as {
    messageIds: string[];
  };

  const formatIds: Types.ObjectId[] = [];
  messageIds.forEach((id: string) => {
    formatIds.push(Types.ObjectId(id));
  });

  // FIND ALL MESSAGE ACCOUNT SELECTED TO BE DELETED
  const messages = await models.Message.find({
    _id: { $in: formatIds }, // eslint-disable-line
  });

  // ACTIVITY LOGGER
  // ===============================================
  const DeletedMessages: any[] = []; // HOLD ACTIVITY LOG FOR EACH ACCOUNT DELETED
  // eslint-disable-next-line
  for (let message of messages) {
    // eslint-disable-next-line

    DeletedMessages.push({
      group: res.locals.groupId,
      userType: ACCOUNT_TYPE.AGENCY_ACCOUNT,
      admin: res.locals.id, // eslint-disable-line
      user: res.locals.id,
      entity: Entities.MESSAGES,
      type: EntitiesAction.DELETE,
      description: 'Message deleted',
      payload: {
        message: message.message,
        phoneNumbers: message.contacts,
        time: message.time,
        id: message._id, // eslint-disable-line
      },
      date: new Date(),
    });
  }
  const Activity = new models.Activities(); // CREATE A NEW ACTIVITY OBJECT
  await Activity.collection.insertMany(DeletedMessages);

  const doc = await models.Message.deleteMany({
    _id: { $in: formatIds },
  });

  return ProcessingSuccess(res, doc);
}
