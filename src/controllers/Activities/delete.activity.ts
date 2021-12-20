import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { ProcessingSuccess } from '../../RequestStatus/status';
import models from '../../models';

export default async function DeleteMultipleActivity(
  req: Request,
  res: Response,
) {
  const { activitiesId } = req.body as {
    activitiesId: string[];
  };

  const formatIds: any[] = [];
  activitiesId.forEach((id: string) => {
    formatIds.push(Types.ObjectId(id));
  });

  const doc = await models.Activities.deleteMany({
    _id: { $in: formatIds },
  });

  return ProcessingSuccess(res, doc);
}
