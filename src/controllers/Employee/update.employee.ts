import { Request, Response } from 'express';
import { Types } from 'mongoose';
import {
  ProcessingSuccess,
  ResourceNotFound,
} from '../../RequestStatus/status';
import models from '../../models';
import { EmployeeSignupProps } from '../../Types/interfaces';
import constants from '../../constants';
import {
  ACCOUNT_TYPE,
  Entities,
  EntitiesAction,
} from '../../constants/enums';
import { getPhoneNumberInfo } from '../../utills/utills';

export async function UpdateEmployee(req: Request, res: Response) {
  const { id, updates } = req.body as {
    id: string;
    updates: EmployeeSignupProps;
  };
  const ID = Types.ObjectId(id);

  const doc = await models.Employee.findOneAndUpdate(
    { _id: ID },
    updates,
    { new: true },
  ).populate('groupId roleId');

  if (!doc)
    return ResourceNotFound(
      res,
      constants.RequestResponse.EmployeeNotFound,
    );
  if (updates.countryCode && updates.phoneNumber) {
    const intlPhoneNumber = getPhoneNumberInfo(
      updates.phoneNumber,
      updates.countryCode,
    );
    doc.phoneNumberInternational = intlPhoneNumber;
    await doc.save({ validateBeforeSave: false });
  }
  const Activity = new models.Activities({
    group: '',
    userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.EMPLOYEES,
    type: EntitiesAction.UPDATE,
    description: 'Employee Account details updated !!!',
    payload: {
      name: doc?.name,
      email: doc?.email,
      address: doc?.address,
      id: doc?._id, // eslint-disable-line
      department: doc.groupId ? (doc as any).groupId.name : '',
      role: doc.roleId ? (doc as any).roleId.name : '',
    },
    date: new Date(),
  });
  await Activity.save();
  return ProcessingSuccess(res, doc);
}

export async function AssignEmployeeToDepartment(
  req: Request,
  res: Response,
) {
  const { employeeId, departmentId } = req.body as {
    employeeId: string;
    departmentId: string;
  };
  const $EID = Types.ObjectId(employeeId);
  const $DID = Types.ObjectId(departmentId);

  const employeeExist = await models.Employee.findOne({ _id: $EID });
  const departmentExist = await models.Department.findOne({
    _id: $DID,
  });

  if (!employeeExist)
    return ResourceNotFound(
      res,
      constants.RequestResponse.EmployeeNotFound,
    );
  if (!departmentExist)
    return ResourceNotFound(
      res,
      constants.RequestResponse.DepartmentNotFound,
    );

  const doc = await models.Employee.findOneAndUpdate(
    { _id: $EID },
    {
      $set: { groupId: $DID },
    },
    { new: true },
  ).populate('groupId roleId');
  const Activity = new models.Activities({
    group: '',
    userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.EMPLOYEES,
    type: EntitiesAction.UPDATE,
    description: 'Employee department changed successfully!!!',
    payload: {
      name: doc?.name,
      email: doc?.email,
      address: doc?.address,
      id: doc?._id, // eslint-disable-line
      department: departmentExist.name,
      role: (doc as any).roleId.name,
    },
    date: new Date(),
  });
  await Activity.save();
  return ProcessingSuccess(res, doc);
}

export async function AssignEmployeeToRole(
  req: Request,
  res: Response,
) {
  const { employeeId, roleId } = req.body as {
    employeeId: string;
    roleId: string;
  };
  const $EID = Types.ObjectId(employeeId);
  const $RID = Types.ObjectId(roleId);

  const employeeExist = await models.Employee.findOne({ _id: $EID });
  const roleExist = await models.Role.findOne({ _id: $RID });

  if (!employeeExist)
    return ResourceNotFound(
      res,
      constants.RequestResponse.EmployeeNotFound,
    );
  if (!roleExist)
    return ResourceNotFound(
      res,
      constants.RequestResponse.RoleNotFound,
    );

  const doc = await models.Employee.findOneAndUpdate(
    { _id: $EID },
    {
      $set: { roleId: $RID },
    },
    { new: true },
  )
    .populate('groupId roleId')
    .select({
      hash: 0,
      salt: 0,
    });

  return ProcessingSuccess(res, doc);
}
