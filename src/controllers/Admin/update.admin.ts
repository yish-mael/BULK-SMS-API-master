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

export default async function UpdateAdmin(
  req: Request,
  res: Response,
) {
  // GET REQUEST BODY
  // ===================================
  const { id, updates } = req.body as {
    id: string;
    updates: any;
    password: string;
  };

  // TRASNFORM STRING HEX VALUE TO BSON OBJECT
  // =============================================

  const ID = Types.ObjectId(id);

  let password = '';

  // CHECKS IF PASSWORD IS PART OF UPDATE OBJECT
  // =========================================
  if (updates?.password) {
    password = updates.password;
  }

  // SINCE PASSWORD IS NOT STORED IN DATABASE REMOVE FROM UPDATE OBJECT TO AVOID VALIDATION EXCEPTION
  // ===================================================================

  delete updates.password;

  // UPDATE DOCUMENT
  // ====================
  const doc = await models.Admin.findOneAndUpdate(
    { _id: ID },
    updates,
    { new: true },
  ).select({
    hash: 0,
    salt: 0,
  });

  // IF PASSWORD IS UPDATED SET PASSWORD
  // =======================================

  if (password) {
    doc?.setPassword(password);
  }

  // SAVE PASSWORD
  doc?.save();

  // ACTIVITY LOGGER
  // ============================

  const Activity = new models.Activities({
    group: '',
    userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.ADMIN,
    type: EntitiesAction.UPDATE,
    description: 'Admin account updated',
    payload: {
      name: doc?.name,
      email: doc?.email,
      id: doc?._id, // eslint-disable-line
    },
    date: new Date(),
  });
  if (!doc)
    return ResourceNotFound(
      res,
      constants.RequestResponse.AdminNotFound,
    );

  await Activity.save(); // SAVE ACTIVITY LOG
  return ProcessingSuccess(res, doc); // SUCCESS RESPONSE
}
