import { Router } from 'express';
import EmployeeController from '../controllers/Employee';
import Validation from '../Validators/Employee';
import Activities from '../controllers/Activities';
import ProtectRoutes from '../Middlewares/check.route.access';
import constants from '../constants/index';
import HandleAsyncFactory from '../Middlewares/async.error.handler';
import LoginValidation from '../Validators/Auth/index';
import LoginAccount from '../controllers/Auth/login.user';
import ValidateRessetPasswordEmail from '../Validators/PasswordResset/validate.email.resset.password';
import ValidateRessetPassword from '../Validators/PasswordResset/validate.password.resset';
import ExtractInfoMiddleware from '../Middlewares/extract.info.header';
import UserGetValidator from '../Validators/Get.Requests/user.get.validator';
import ValidatePhoneNumberVerification from '../Validators/PasswordResset/validate.verify.phone';
import ValidateVerificationPin from '../Validators/PasswordResset/validate.verify.code';
import {
  SendSMSVerificationPin,
  verifyCode,
} from '../controllers/Employee/verification';

const {
  GET_ID_PARAM,
  GET_EMPLOYESS_BY_GROUP,
  SEND_RESSET_PASSWORD_SMS,
  VERIFIFY_CODE,
  SEND_RESSET_PASSWORD_LINK,
  RESSET_PASSWORD,
  ACTIVITIES,
} = constants.RoutesSubs;
const { LOGIN_BASE } = constants.RouteBase;
const employee = Router();

employee.post(
  SEND_RESSET_PASSWORD_LINK,
  HandleAsyncFactory(ValidateRessetPasswordEmail),
  HandleAsyncFactory(EmployeeController.RequestRessetEmail),
);

employee.get(
  ACTIVITIES,
  HandleAsyncFactory(ProtectRoutes),
  HandleAsyncFactory(UserGetValidator),
  HandleAsyncFactory(Activities.GetAllActivity),
);

employee.post(
  RESSET_PASSWORD,
  HandleAsyncFactory(ExtractInfoMiddleware),
  HandleAsyncFactory(ValidateRessetPassword),
  HandleAsyncFactory(EmployeeController.RessetPassword),
);

employee.post(
  SEND_RESSET_PASSWORD_SMS,
  HandleAsyncFactory(ValidatePhoneNumberVerification),
  HandleAsyncFactory(SendSMSVerificationPin),
);

employee.post(
  VERIFIFY_CODE,
  HandleAsyncFactory(ValidateVerificationPin),
  HandleAsyncFactory(verifyCode),
);

employee.get(
  GET_ID_PARAM,
  HandleAsyncFactory(ProtectRoutes),
  HandleAsyncFactory(Validation.ValidateGetSingleEmployee),
  HandleAsyncFactory(EmployeeController.GetSingleEmployee),
);

employee.post(
  LOGIN_BASE,
  HandleAsyncFactory(LoginValidation.LoginAdmin),
  HandleAsyncFactory(LoginAccount),
);

employee.get(
  GET_EMPLOYESS_BY_GROUP,
  HandleAsyncFactory(ProtectRoutes),
  HandleAsyncFactory(Validation.ValidateGetEmployeesByGroup),
  HandleAsyncFactory(EmployeeController.GetAllEmployeeByAgency),
);

export default employee;
