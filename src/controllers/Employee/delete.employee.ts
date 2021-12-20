import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { ProcessingSuccess } from '../../RequestStatus/status';
import models from '../../models';
import {
  ACCOUNT_TYPE,
  Entities,
  EntitiesAction,
} from '../../constants/enums';

export default async function DeleteMultipleEmployee(
  req: Request,
  res: Response,
) {
  const { employeeIds } = req.body as {
    employeeIds: string[];
  };

  const formatIds: any[] = [];
  employeeIds.forEach((id: string) => {
    formatIds.push(Types.ObjectId(id));
  });
  const DeletedEmployees: any[] = [];
  const employeeAccounts = await models.Employee.find({
    _id: { $in: formatIds }, // eslint-disable-line;
  });
  // eslint-disable-next-line
  for (let employee of employeeAccounts) {
    // eslint-disable-next-line

    DeletedEmployees.push({
      group: '',
      userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
      admin: res.locals.id, // eslint-disable-line
      user: res.locals.id,
      entity: Entities.EMPLOYEES,
      type: EntitiesAction.DELETE,
      description: 'Employee account/s deleted',
      payload: {
        name: employee?.name,
        email: employee?.email,
        id: employee?._id, // eslint-disable-line
      },
      date: new Date(),
    });
  }
  const Activity = new models.Activities();
  const doc = await models.Employee.deleteMany({
    _id: { $in: formatIds },
  });

  await Activity.collection.insertMany(DeletedEmployees);
  return ProcessingSuccess(res, doc);
}
