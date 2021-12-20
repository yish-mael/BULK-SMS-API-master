import { Request, Response } from 'express';
import { Types } from 'mongoose';
import {
  InvalidInputs,
  ProcessingSuccess,
  UserExist,
} from '../../RequestStatus/status';
import models from '../../models';
import { EmployeeSignupProps } from '../../Types/interfaces';
import {
  ACCOUNT_TYPE,
  Entities,
  EntitiesAction,
} from '../../constants/enums';
import {
  getPhoneNumberInfo,
  MessageService,
  sendAccountCredentials,
} from '../../utills/utills';

export default async function CreateEmployee(
  req: Request,
  res: Response,
) {
  /* eslint-disable */
  let {
    email,
    name,
    password,
    address,
    groupId,
    roleId,
    phoneNumber,
    countryCode,
  } = req.body as EmployeeSignupProps;
  /* eslint-enable */
  const employee = new models.Employee();

  const query = [];

  if (email) {
    email = email.trim().toLowerCase();
    query.push({ email });
  }

  if (phoneNumber) {
    phoneNumber = phoneNumber.trim();
    query.push({ phoneNumber });
  }
  // CHECKS IF ACCOUNT ALREADY EXIST
  const findAccount = await models.Employee.findOne({
    $or: query,
  });

  // PHONE NUMBER INTEGRATION
  if (phoneNumber) {
    try {
      const phoneInfo = getPhoneNumberInfo(phoneNumber, countryCode);
      if (phoneInfo) {
        employee.phoneNumberInternational = phoneInfo;
        employee.phoneNumber = phoneNumber;
        employee.countryCode = countryCode;
      }

      if (!email && !phoneInfo) {
        return InvalidInputs(
          res,
          'Email or phone number must be provided',
        );
      }
    } catch {
      if (!email) {
        return InvalidInputs(
          res,
          'Email or phone number must be provided',
        );
      }
    }
  }

  if (findAccount) return UserExist(res);

  const $GROUPID = Types.ObjectId(groupId);
  const $ROLEID = Types.ObjectId(roleId);

  const Activity = new models.Activities({
    group: groupId,
    userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.EMPLOYEES,
    type: EntitiesAction.CREATE,
    description: 'New Employee account created',
    payload: {
      name,
      email,
      id: employee._id, // eslint-disable-line
      address,
    },
    date: new Date(),
  });
  employee.setPassword(password);

  employee.name = name;
  employee.email = email;
  employee.address = address;

  employee.groupId = $GROUPID;
  employee.roleId = $ROLEID;

  await employee.save({ validateBeforeSave: false });

  const id = employee._id; //eslint-disable-line

  const createdEmployee = await models.Employee.findOne({
    _id: id,
  })
    .populate('groupId roleId')
    .select({
      hash: 0,
      salt: 0,
      password: 0,
    });

  if (email) {
    await sendAccountCredentials(name, email, password, phoneNumber);
  } else {
    const message = `Your Credentials for SMS platform is Phone number : ${phoneNumber} password : ${password}`;
    await MessageService(
      [employee.phoneNumberInternational],
      message,
    );
  }
  await Activity.save();

  return ProcessingSuccess(res, createdEmployee);
}
