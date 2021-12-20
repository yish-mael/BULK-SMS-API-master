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

export async function DeleteReport(req: Request, res: Response) {
  const { id } = req.params;

  const doc = await models.Reports.findOneAndDelete({ _id: id });
  if (!doc)
    return ResourceNotFound(
      res,
      constants.RequestResponse.ReportNotFoundWithId,
    );
  // ACTIVITY LOGGER
  // ============================

  const Activity = new models.Activities({
    group: '',
    userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.REPORTS,
    type: EntitiesAction.DELETE,
    description: 'Report deleted',
    payload: {
      message: doc?.message,
      id: doc?._id, // eslint-disable-line
    },
    date: new Date(),
  });

  await Activity.save();
  return ProcessingSuccess(res, doc);
}

export async function DeleteMultipleReports(
  req: Request,
  res: Response,
) {
  const { reportIds } = req.body as {
    reportIds: string[];
  };
  // console.log('req contacts', contactIds);
  const formatIds: Types.ObjectId[] = [];
  reportIds.forEach((id: string) => {
    formatIds.push(Types.ObjectId(id));
  });

  const DeletedReports: any[] = [];

  const reports = await models.Reports.find({
    _id: { $in: formatIds }, // eslint-disable-line;
  });
  // eslint-disable-next-line
  for (let report of reports) {
    // eslint-disable-next-line

    DeletedReports.push({
      group: '',
      userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
      admin: res.locals.id, // eslint-disable-line
      user: res.locals.id,
      entity: Entities.REPORTS,
      type: EntitiesAction.DELETE,
      description: 'Report  deleted',
      payload: {
        message: report?.message,
        id: report?._id, // eslint-disable-line
      },
      date: new Date(),
    });
  }
  const Activity = new models.Activities();

  const doc = await models.Reports.deleteMany({
    _id: { $in: formatIds },
  });

  await Activity.collection.insertMany(DeletedReports);

  return ProcessingSuccess(res, doc);
}
