import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { ProcessingSuccess } from '../../RequestStatus/status';
import models from '../../models';
import {
  ACCOUNT_TYPE,
  Entities,
  EntitiesAction,
} from '../../constants/enums';

export default async function DeleteMultipleDepartment(
  req: Request,
  res: Response,
) {
  const { groupIds } = req.body as {
    groupIds: string[];
  };

  /* eslint-disable */
  const formatIds: Types.ObjectId[] = [];
  groupIds.forEach((id: string) => {
    formatIds.push(Types.ObjectId(id));
  });

  // FIND ALL DEPARTMENT ACCOUNT SELECTED TO BE DELETED
  const departments = await models.Department.find({
    _id: { $in: formatIds }, // eslint-disable-line
  });

  // ACTIVITY LOGGER
  // ===============================================
  const DeletedDepartment: any[] = []; // HOLD ACTIVITY LOG FOR EACH ACCOUNT DELETED
  // eslint-disable-next-line
  for (let department of departments) {
    // eslint-disable-next-line

    DeletedDepartment.push({
      group: '',
      userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
      admin: res.locals.id, // eslint-disable-line
      user: res.locals.id,
      entity: Entities.DEPARTMENTS,
      type: EntitiesAction.DELETE,
      description: 'Department deleted',
      payload: {
        name: department?.name,
        id: department?._id, // eslint-disable-line
      },
      date: new Date(),
    });
  }
  const Activity = new models.Activities(); // CREATE A NEW ACTIVITY OBJECT

  const doc = await models.Department.deleteMany({
    _id: { $in: formatIds },
  });

  // INSERT ALL ACTIVITIES
  // ======================
  await Activity.collection.insertMany(DeletedDepartment);

  return ProcessingSuccess(res, doc);
}
