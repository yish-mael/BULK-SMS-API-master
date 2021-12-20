/* eslint-disable radix */
import * as jwt from 'jsonwebtoken';
import * as mailjet from 'node-mailjet';
import {
  PhoneNumberFormat as PNF,
  PhoneNumberUtil,
} from 'google-libphonenumber';
import mongoose from 'mongoose';
import * as fs from 'fs';
import config from 'config';
import constants from '../constants/index';
import { RequestParams } from '../Types/interfaces';
import models from '../models/index';

// import MessageStatus from '../constants/enums';

const privateKey = fs.readFileSync(
  `${process.env.INIT_CWD}/private.key`,
  'utf-8',
);
const publicKey = fs.readFileSync(
  `${process.env.INIT_CWD}/public.key`,
  'utf-8',
);

require('dotenv/config');

const credentials = {
  apiKey: config.get('AFRICATALKING_API_KEY'),
  username: config.get('AFRICATALKING_API_USERNAME'),
};

console.log(credentials);

// Initialize the SDK
const AfricasTalking = require('africastalking')(credentials);

const sms = AfricasTalking.SMS;
const application = AfricasTalking.APPLICATION;

export function getPhoneNumberInfo(
  phone: string,
  countryCode: string,
) {
  try {
    // Get an instance of `PhoneNumberUtil`.
    const phoneUtil = PhoneNumberUtil.getInstance();

    // Parse number with country code and keep raw input.
    const number = phoneUtil.parseAndKeepRawInput(phone, countryCode);

    // Print the phone's
    const phoneNumber = phoneUtil.format(number, PNF.E164);

    return phoneNumber;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function GetApplicationInformation() {
  const { UserData } = await application.fetchApplicationData();
  const balanceInteger = parseFloat(UserData.balance.split(' ')[1]);
  return balanceInteger;
}

export async function getAccountDetails() {
  const balanceAfricatalking = await GetApplicationInformation();
  const allDepartment = await models.Department.find({});
  const allocated = allDepartment.map(
    (department) => department.credit,
  );
  let totalAmountAllocated = 0;

  if (allocated.length > 0) {
    totalAmountAllocated = allocated.reduce(
      (curr, next) => curr + next,
    );
  }

  return {
    balanceAfterAllocation:
      balanceAfricatalking - totalAmountAllocated,
    totalAmountAllocated,
    totalBalance: balanceAfricatalking,
  };
}

export async function MessageService(
  phoneNumbers: string[], // eslint-disable-line
  message: string, // eslint-disable-line
  // senderId?: string,
) {
  const options = {
    // Set the numbers you want to send to in international format
    to: phoneNumbers,
    // Set your message
    message,
    // Set your shortCode or senderId
    from: 'AFRICASTKNG',
  };

  // That’s it, hit send and we’ll take care of the rest
  return sms.send(options);
}

// setInterval(async () => {
//   const messages = await models.Message.find({
//     scheduleDate: { $lte: Date.now() },
//     status: MessageStatus.APPROVED,
//   });

//   /* eslint-disable */
//   for (let message of messages) {
//     console.log('We are sending message');
//     console.log(message.message);
//     await MessageService(message.contacts, message.message);
//     message.status = MessageStatus.SENT;
//     await message.save();
//     await models.Department.findOneAndUpdate(
//       {
//         _id: message.groupId, // eslint-disable
//       },
//       {
//         $inc: { credit: -message.contacts.length },
//       },
//     );
//   }
// }, 600000);

/* eslint-enable */

export function encodeToJwtToken(
  data: any,
  expire?: number | string,
) {
  const signOptions: jwt.SignOptions = {
    algorithm: config.get('JWT_ALGO') as jwt.Algorithm,
  };
  if (expire) {
    // signOptions.expiresIn = expire;
  }

  try {
    const token = jwt.sign(data, privateKey, signOptions);
    return token;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export function decodeJwtToken(token: string) {
  try {
    const verified = jwt.verify(token, publicKey, {
      algorithms: [config.get('JWT_ALGO') as jwt.Algorithm],
    });
    if (verified instanceof Error) {
      const response = verified as jwt.TokenExpiredError;
      throw new Error(response.message);
    }

    return verified;
  } catch (err) {
    const error = err as jwt.TokenExpiredError;
    throw error;
  }
}

export function getTokens(userCreds: any) {
  try {
    const accessToken = encodeToJwtToken(
      {
        userId: userCreds,
      },
      constants.TokenExpiry.ACCESS_TOKENS,
    );
    const refreshToken = encodeToJwtToken(userCreds);

    return { accessToken, refreshToken };
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export function RemoveDuplicate(arr: string[]) {
  const newSet = new Set(arr);
  const newArr: string[] = [];
  newSet.forEach((element) => {
    newArr.push(element);
  });
  return newArr;
}

export function GeneratePin() {
  return (Math.floor(Math.random() * 10000) + 10000)
    .toString()
    .substring(1)
    .split('')
    .join(',');
}

export function CheckPassword(pwd: string) {
  const passw = /^[A-Za-z]\w{7,14}$/;

  if (passw.test(pwd)) {
    return true;
  }
  return false;
}

type queryConfiguration = {
  roles: string;
  uid: string;
  agency: string;
  status?: string;
  userType?: string;
  date?: any;
};

// compose query base on requestParam which is consistent on GET requests
export function getQuery(
  requestParams: RequestParams, // request parameters attatched to all GET requests
  queryConfig: queryConfiguration, // configuration on fields to consider while composing query with customize fields base on the caller
) {
  let query = {}; // query object

  // request parameters destructuring
  const {
    searchText,
    role,
    uid,
    agency,
    pageSize,
    pageNumber,
    status,
    userType,
    startDate,
    endDate,
  } = requestParams;

  // check if document is to apply the agency filter
  if (queryConfig.agency && agency) {
    // compose query with rest operators without losing previous values of object
    query = {
      ...query,
      [queryConfig.agency]: mongoose.Types.ObjectId(agency),
    };
  }

  // check if document is to apply the roles filter
  if (queryConfig.roles && role) {
    // compose query with rest operators without losing previous values of object
    query = {
      ...query,
      [queryConfig.roles]: mongoose.Types.ObjectId(role),
    };
  }

  // check if document is to apply the uid filter
  if (queryConfig.uid && uid) {
    // compose query with rest operators without losing previous values of object
    query = {
      ...query,
      [queryConfig.uid]: mongoose.Types.ObjectId(uid),
    };
  }

  // check if document is to apply the status filter
  if (queryConfig.status && status) {
    // compose query with rest operators without losing previous values of object
    query = {
      ...query,
      [queryConfig.status]: status,
    };
  }

  // check if document is to apply the search filter, note if search is activated we perform a full text search therefore all filters will be ignored
  if (searchText) {
    // overides query object
    query = { $text: { $search: searchText } };
  }

  // check if document is to apply the status filter
  if (queryConfig.userType && userType) {
    // compose query with rest operators without losing previous values of object
    query = {
      ...query,
      [queryConfig.userType]: userType,
    };
  }

  // check if document is to apply the status filter
  if (queryConfig.date && startDate && endDate) {
    // compose query with rest operators without losing previous values of object
    query = {
      ...query,
      [queryConfig.date]: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };
  }

  return {
    paginationQuery: query,
    paginationConfig: {
      limit: parseInt(pageSize.toString()), // eslint-disable-line
      page: parseInt(pageNumber.toString()), // eslint-disable-line
    },
  };
}

export async function sendRessetPasswordLink(
  token: string,
  user: { name: string; isAdmin: boolean; email: string },
) {
  let html = `<h3>Hi ${user.name}.</h3>`;
  if (user.isAdmin) {
    html += `Use this link  <a href="https://sms-platform-admin.herokuapp.com/auth/reset-password/${token}">Resset password link to resset your account password for SMS platform</a>`;
  } else {
    html += `Use this link  <a href="https://sms-platform-agencies.herokuapp.com/auth/reset-password/${token}">Reset password link to resset your account password for SMS platform</a>`;
  }
  html +=
    '<p> If you did not initiate this action, you can ignore this email. ';
  html += '<p>Thank you.</p>';
  html += 'SMS plafform  Team!';

  await mailjet
    .connect(
      config.get('MAILJET_PUBLIC'),
      config.get('MAILJET_PRIVATE'),
    )
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: 'developers@dixre.com',
            Name: 'SMS Platform',
          },
          To: [
            {
              Email: user.email,
              Name: `${user.name}`,
            },
          ],
          Subject: 'Password Resset email.',
          TextPart: '',
          HTMLPart: html,
          CustomID: 'AppGettingStartedTest',
        },
      ],
    });
}

export async function sendAccountCredentials(
  name: string,
  email: string,
  password: string,
  phoneNumber: string,
) {
  let html = `<h3>Hi ${name}.</h3>`;

  html +=
    '<p> This are your credentials for SMS platform. You can use your email and password or phone and password to login. </p>';
  html += `<h3> Email </h3>:  ${email}`;
  html += `<h3> PhoneNumber </h3>:  ${phoneNumber}`;
  html += `<h3> Password </h3> :${password}`;
  html += '<p>Thank you.</p>';
  html += 'SMS plafform  Team!';

  await mailjet
    .connect(
      config.get('MAILJET_PUBLIC'),
      config.get('MAILJET_PRIVATE'),
    )
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: 'developers@dixre.com',
            Name: 'SMS Platform',
          },
          To: [
            {
              Email: email,
              Name: name,
            },
          ],
          Subject: 'Account Information.',
          TextPart: '',
          HTMLPart: html,
          CustomID: 'AppGettingStartedTest',
        },
      ],
    });
}
