import { Response, Request } from 'express';
// @ts-ignore
import moment from 'moment';
import app from '../../index';
import {
  InvalidInputs,
  ProcessingSuccess,
  UnAuthorized,
  InvalidCredential,
  LastPinNotTimout,
  MaxPinTrialExceeded,
  VerificationStatusError,
} from '../../RequestStatus/status';
import {
  getPhoneNumberInfo,
  GeneratePin,
  encodeToJwtToken,
  decodeJwtToken,
  getTokens,
  MessageService,
} from '../../utills/utills';
import models from '../../models/index';
import { NumverifyResponseType } from '../../Types/numverifyResponse';
import Constants from '../../constants/index';
import { EmployeeProps } from '../../Types/interfaces';

require('dotenv/config');

export async function SendSMSVerificationPin(
  req: Request,
  res: Response,
) {
  const { phoneNumber, countryCode } = req.body as {
    phoneNumber: string;
    countryCode: string;
  };

  if (!phoneNumber || !countryCode) return InvalidInputs(res);
  const intlFormat = await getPhoneNumberInfo(
    phoneNumber,
    countryCode,
  );

  const PhoneNumberExist = await models.Employee.findOne({
    phoneNumberInternational: intlFormat,
  });

  if (!PhoneNumberExist) return InvalidCredential(res);

  // check if user have is asking for a token when 3 minutes is not exhausted yet
  const now = new Date();
  const userVerificationinfo = await models.Verification.findOne({
    phoneNumber: intlFormat,
  });
  if (userVerificationinfo) {
    if (userVerificationinfo.lastTimePinRequested) {
      if (userVerificationinfo.lastTimePinRequested > now) {
        return LastPinNotTimout(res);
      }
    }
  }

  const PIN = GeneratePin();

  const token = encodeToJwtToken(
    { intlFormat },
    Constants.TokenExpiry.VERIFICATION_TOKENS,
  );

  await models.Verification.deleteMany({ phoneNumber: intlFormat });

  // saving credentials in secure database
  const saveCred = new models.Verification();
  saveCred.phoneNumber = intlFormat;
  saveCred.pin = PIN.split(',').join('');
  saveCred.token = token;
  saveCred.date = new Date();
  saveCred.lastTimePinRequested = moment(new Date()).add(
    Constants.Timers.TIME_BEFORE_NEXT_PIN_REQUEST,
    'minutes',
  );
  saveCred.pinTrialDuration = moment(new Date()).add(
    Constants.Timers.TIME_BEFORE_PIN_TRIAL_ELAPSE,
    'minutes',
  );

  await saveCred.save(); // save document

  if (app.get('env') === 'production') {
    const result = {
      token,
    };
    await MessageService(
      [intlFormat],
      `Your phone verification code is, ${PIN}`,
    );
    return ProcessingSuccess(res, result);
  }
  return ProcessingSuccess(res, {
    token,
    pin: PIN.split(',').join(''),
  });
}

export async function verifyCode(req: Request, res: Response) {
  const { pin, token } = req.body as { pin: string; token: string };

  if (!pin || !token) return InvalidInputs(res);

  const decode: NumverifyResponseType = decodeJwtToken(
    token,
  ) as NumverifyResponseType;

  const { intlFormat } = decode;

  const getDoc = await models.Verification.findOne({
    phoneNumber: intlFormat,
  });

  let phoneNumber: string;
  let vCode: string;

  if (getDoc) {
    phoneNumber = getDoc.phoneNumber;
    vCode = getDoc.pin;
  } else {
    return UnAuthorized(res);
  }

  if (getDoc.pinTrialDuration) {
    const now = new Date();
    if (getDoc.pinTrialDuration > now) {
      if (
        getDoc.pinTrials >= Constants.Timers.MAX_PIN_TRIAL_ATTEMPTS
      ) {
        return MaxPinTrialExceeded(res);
      }
    }
  }

  if (intlFormat === phoneNumber && pin === vCode) {
    const user = await models.Employee.findOne({
      phoneNumberInternational: intlFormat,
    });

    const objectifyBSON = user?.toObject() as EmployeeProps;
    const tokens = getTokens({ ...objectifyBSON, isAdmin: false });
    const { accessToken } = tokens;

    return ProcessingSuccess(res, { token: accessToken });
  }

  await getDoc.incrementPinTrial();

  return VerificationStatusError(
    res,
    Constants.Validations.INCORRECT_PIN,
  );
}
