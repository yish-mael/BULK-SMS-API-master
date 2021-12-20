import { Request, Response } from 'express';
import {
  InvalidInputs,
  ProcessingSuccess,
  UserExist,
} from '../../RequestStatus/status';
import models from '../../models';
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

export default async function CreateAdmin(
  req: Request,
  res: Response,
) {
  // COLLECT REQUEST BODY
  // ==============================
  // eslint-disable-next-line
  let { email, name, password, phoneNumber, countryCode } =
    req.body as {
      email: string;
      name: string;
      password: string;
      phoneNumber: string;
      countryCode: string;
    };
  const query = [];

  if (email) {
    email = email.trim().toLowerCase();
    query.push({ email });
  }

  if (phoneNumber) {
    phoneNumber = phoneNumber.trim();
    query.push({ phoneNumber });
  }

  const admin = new models.Admin({
    email,
    name,
    date: new Date(),
  }); // INTIALIZE A NEW ADMIN OBJECT

  // CHECKS IF ACCOUNT ALREADY EXIST
  const findAccount = await models.Admin.findOne({
    $or: query,
  });

  // PHONE NUMBER INTEGRATION
  if (phoneNumber) {
    try {
      const phoneInfo = getPhoneNumberInfo(phoneNumber, countryCode);
      if (phoneInfo) {
        admin.phoneNumberInternational = phoneInfo;
        admin.phoneNumber = phoneNumber;
        admin.countryCode = countryCode;
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

  admin.setPassword(password); // SET NEW ADMIN PASSWORD

  // ACTIVITY LOGGER
  // ===============================================
  const Activity = new models.Activities({
    group: '',
    userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.ADMIN,
    type: EntitiesAction.CREATE,
    description: 'New Admin account created',
    payload: {
      name,
      email,
      id: admin._id, // eslint-disable-line
    },
    date: new Date(),
  });

  await admin.save({ validateBeforeSave: false }); // WRITE NEW ADMIN TO DB

  // GET NEW ACCOUNT CREATED
  const createdAdmin = await models.Admin.findOne({
    _id: admin._id, // eslint-disable-line
  }).select({
    hash: 0,
    salt: 0,
  });

  if (email) {
    await sendAccountCredentials(name, email, password, phoneNumber);
  } else {
    const message = `Your Credentials for SMS platform is Phone number : ${phoneNumber} password : ${password}`;
    await MessageService([admin.phoneNumberInternational], message);
  }

  await Activity.save(); // SAVE  ACTIVITY  LOG
  return ProcessingSuccess(res, createdAdmin); // RESPONSE SUCCESS WITH NEW ADMIN
}
