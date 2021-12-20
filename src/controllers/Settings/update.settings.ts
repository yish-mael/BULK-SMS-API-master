import { Request, Response } from 'express';
import { ProcessingSuccess } from '../../RequestStatus/status';
import models from '../../models';
import { Settings } from '../../Types/interfaces';
import {
  ACCOUNT_TYPE,
  Entities,
  EntitiesAction,
} from '../../constants/enums';

export default async function UpdateSettings(
  req: Request,
  res: Response,
) {
  const updates = req.body as {
    updates: Settings;
  };

  const getDoc = await models.Settings.find();
  let doc;

  if (!getDoc[0]) {
    const createSettins = new models.Settings(updates);

    await createSettins.save({ validateBeforeSave: false });
    const getCreatedDoc = await models.Settings.find();
    doc = getCreatedDoc[0]; // eslint-disable-line
  }

  if (getDoc[0]) {
    doc = await models.Settings.findOneAndUpdate(
      { _id: getDoc[0]._id }, // eslint-disable-line
      updates,
      { new: true },
    );
  }

  // ACTIVITY LOGGER
  // ============================

  const Activity = new models.Activities({
    group: res.locals.groupId,
    userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.SETTINGS,
    type: EntitiesAction.UPDATE,
    description: 'Settings updated successfully',
    payload: {},
    date: new Date(),
  });

  await Activity.save({ validateBeforeSave: false });

  return ProcessingSuccess(res, doc);
}
