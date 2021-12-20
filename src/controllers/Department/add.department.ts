import { Request, Response } from 'express';
import mongoose from 'mongoose';
import {
  ProcessingSuccess,
  RequestForbidden,
} from '../../RequestStatus/status';
import models from '../../models';
import {
  ACCOUNT_TYPE,
  Entities,
  EntitiesAction,
} from '../../constants/enums';
import constants from '../../constants/index';
import { getAccountDetails } from '../../utills/utills';

export default async function CreateDepartment(
  req: Request,
  res: Response,
) {
  const { name, credit, senderIds } = req.body as {
    name: string;
    credit: number;
    senderIds: string[];
  };
  let minimumReleadThreshold = 0;
  let maximumReloadThreshold = 0;

  const getSettings = await models.Settings.findOne({});

  if (getSettings) {
    minimumReleadThreshold = getSettings.minimumReloadThreshold;
    maximumReloadThreshold = getSettings.maximumReloadThreshold;
  }

  if (credit && credit !== 0) {
    if (credit < minimumReleadThreshold) {
      return RequestForbidden(
        res,
        constants.Validations.MINIMUM_ALLOCATION_QUOTA_NOT_ATTAINED,
      );
    }
    if (credit > maximumReloadThreshold) {
      return RequestForbidden(
        res,
        constants.Validations.MAXIMUM_ALLOCATION_QUTO_EXCEEDED,
      );
    }
  }
  const department = new models.Department();

  // ACTIVITY LOGGER
  // ===============================================
  const Activity = new models.Activities({
    group: '',
    userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.DEPARTMENTS,
    type: EntitiesAction.CREATE,
    description: 'New Department created',
    payload: {
      name,
      id: department._id, // eslint-disable-line
    },
    date: new Date(),
  });

  const formatSenderIds: any[] = [];

  if (senderIds) {
    senderIds.forEach((val) => {
      formatSenderIds.push(mongoose.Types.ObjectId(val));
    });
  }
  department.name = name;
  department.credit = credit;
  department.senderIds = formatSenderIds;
  const doc = department.populate('senderIds');

  const { balanceAfterAllocation } = await getAccountDetails();
  if (credit <= balanceAfterAllocation) {
    await department.save({ validateBeforeSave: false });
    await Activity.save({ validateBeforeSave: false });
    return ProcessingSuccess(res, doc);
  }

  return RequestForbidden(
    res,
    constants.Validations.QUTO_LIMIT_EXCEEDED,
  );
}
