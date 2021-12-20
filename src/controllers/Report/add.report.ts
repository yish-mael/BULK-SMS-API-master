import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { ProcessingSuccess } from '../../RequestStatus/status';
import models from '../../models';
import {
  ACCOUNT_TYPE,
  Entities,
  EntitiesAction,
} from '../../constants/enums';

export default async function CreateReport(
  req: Request,
  res: Response,
) {
  const { groupId, employeeId, message } = req.body as {
    groupId: string;
    employeeId: string;
    message: string;
  };

  const $GID = Types.ObjectId(groupId);
  const $EID = Types.ObjectId(employeeId);
  const report = new models.Reports();

  // ACTIVITY LOGGER
  // ===============================================
  const Activity = new models.Activities({
    group: groupId,
    userType: ACCOUNT_TYPE.AGENCY_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.REPORTS,
    type: EntitiesAction.CREATE,
    description: 'New Report created',
    payload: {
      message,
      id: report._id, // eslint-disable-line
    },
    date: new Date(),
  });

  report.message = message;
  report.employeeId = $EID;
  report.groupId = $GID;
  report.date = new Date();

  await report.save({ validateBeforeSave: false });
  await Activity.save({ validateBeforeSave: false });
  const $report = await models.Reports.findOne({
    _id: report._id, // eslint-disable-line
  }).populate('groupId employeeId');
  return ProcessingSuccess(res, $report);
}
