import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { ProcessingSuccess } from '../../RequestStatus/status';
import models from '../../models';
import {
  ACCOUNT_TYPE,
  Entities,
  EntitiesAction,
} from '../../constants/enums';

export default async function DeleteMultipleAdmin(
  req: Request,
  res: Response,
) {
  // GET REQUEST BODY
  // ====================================
  const { adminIds } = req.body as {
    adminIds: string[];
  };

  // TRANSFORM STRING HEX-IDs INTO BSON-OBJECTS
  const formatIds: Types.ObjectId[] = [];
  adminIds.forEach((id: string) => {
    formatIds.push(Types.ObjectId(id));
  });

  // FIND ALL ADMIN ACCOUNT SELECTED TO BE DELETED
  const adminAccounts = await models.Admin.find({
    _id: { $in: formatIds }, // eslint-disable-line
  });

  // ACTIVITY LOGGER
  // ===============================================
  const DeletedAdmins: any[] = []; // HOLD ACTIVITY LOG FOR EACH ACCOUNT DELETED
  // eslint-disable-next-line
  for (let admin of adminAccounts) {
    // eslint-disable-next-line

    DeletedAdmins.push({
      group: '',
      userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
      admin: res.locals.id, // eslint-disable-line
      user: res.locals.id,
      entity: Entities.ADMIN,
      type: EntitiesAction.DELETE,
      description: 'Admin account/s deleted',
      payload: {
        name: admin?.name,
        email: admin?.email,
        id: admin?._id, // eslint-disable-line
      },
      date: new Date(),
    });
  }
  const Activity = new models.Activities(); // CREATE A NEW ACTIVITY OBJECT

  /* eslint-enable */

  // DELETE ACCOUNTS
  const doc = await models.Admin.deleteMany({
    _id: { $in: formatIds },
  });

  // INSERT ALL ACTIVITIES
  await Activity.collection.insertMany(DeletedAdmins);
  return ProcessingSuccess(res, doc); // SUCCESS RESPONSE
}
