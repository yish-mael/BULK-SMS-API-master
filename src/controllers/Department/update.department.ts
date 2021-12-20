import { Request, Response } from 'express';
import { Types } from 'mongoose';
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
import { getAccountDetails } from '../../utills/utills';
import constants from '../../constants';

type updatesProps = {
  name: string;
  credit: number;
  senderIds: any[];
};
export async function UpdateDepartment(req: Request, res: Response) {
  const { id } = req.body as {
    id: string;
  };
  let updates = req.body.updates as updatesProps;

  const ID = Types.ObjectId(id);
  if (updates.senderIds) {
    const formattedIDS: Types.ObjectId[] = [];
    updates.senderIds.forEach((senderId: any) => {
      formattedIDS.push(Types.ObjectId(senderId));
    });
    updates.senderIds = formattedIDS;
  }

  if (updates.credit) {
    // check for reload thresholds
    const { balanceAfterAllocation } = await getAccountDetails();
    const { maximumReloadThreshold, minimumReleadThreshold } =
      (await models.Settings.findOne({})) as any;

    if (updates.credit && updates.credit !== 0) {
      if (updates.credit < minimumReleadThreshold) {
        return RequestForbidden(
          res,
          constants.Validations.MINIMUM_ALLOCATION_QUOTA_NOT_ATTAINED,
        );
      }
      if (updates.credit > maximumReloadThreshold) {
        return RequestForbidden(
          res,
          constants.Validations.MAXIMUM_ALLOCATION_QUTO_EXCEEDED,
        );
      }
    }

    // check quota before attempting allocation
    if (updates.credit <= balanceAfterAllocation) {
      updates = {
        ...updates,
        $inc: { credit: updates.credit },
      } as updatesProps;
    } else {
      return RequestForbidden(
        res,
        constants.Validations.QUTO_LIMIT_EXCEEDED,
      );
    }
  }

  // @ts-ignore
  delete updates.credit;

  const doc = await models.Department.findOneAndUpdate(
    { _id: ID },
    updates,
    { new: true },
  ).populate('senderIds');

  // ACTIVITY LOGGER
  // ============================

  const Activity = new models.Activities({
    group: '',
    userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.DEPARTMENTS,
    type: EntitiesAction.UPDATE,
    description: 'Department updated',
    payload: {
      name: doc?.name,
      id: doc?._id, // eslint-disable-line
    },
    date: new Date(),
  });

  await Activity.save({ validateBeforeSave: false });

  return ProcessingSuccess(res, doc);
}

export async function UpdateDepartmentCredit(
  req: Request,
  res: Response,
) {
  const { id, credit } = req.body as {
    id: string;
    credit: number;
  };
  const ID = Types.ObjectId(id);

  const doc = await models.Department.findOneAndUpdate(
    { _id: ID },
    {
      $inc: { credit },
    },
    { new: true },
  );

  // ACTIVITY LOGGER
  // ============================

  const Activity = new models.Activities({
    group: '',
    userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.DEPARTMENTS,
    type: EntitiesAction.UPDATE,
    description: 'SMS added to agency',
    payload: {
      name: doc?.name,
      id: doc?._id, // eslint-disable-line
    },
    date: new Date(),
  });

  await Activity.save();

  return ProcessingSuccess(res, doc);
}
