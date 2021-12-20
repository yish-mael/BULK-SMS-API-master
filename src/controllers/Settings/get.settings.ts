import { Request, Response } from 'express';
import { ProcessingSuccess } from '../../RequestStatus/status';
import models from '../../models';

export default async function GetSettings(
  req: Request,
  res: Response,
) {
  const settings = await models.Settings.find();
  if (settings.length === 0) {
    const createSettins = new models.Settings({
      maximumReloadThreshold: 0,
      minimumReloadThreshold: 0,
    });

    await createSettins.save({ validateBeforeSave: false });
    return ProcessingSuccess(res, createSettins.toObject());
  }
  return ProcessingSuccess(res, settings[0]);
}
