import { Router } from 'express';
import ReportController from '../controllers/Report';
import Validation from '../Validators/Report';
import ProtectRoutes from '../Middlewares/check.route.access';
import constants from '../constants/index';
import HandleAsyncFactory from '../Middlewares/async.error.handler';
import UserGetValidator from '../Validators/Get.Requests/user.get.validator';

const { CREATE_REPORT, BASE_SUB } = constants.RoutesSubs;
const report = Router();

report.post(
  CREATE_REPORT,
  HandleAsyncFactory(ProtectRoutes),
  HandleAsyncFactory(Validation.ValidateCreateReport),
  HandleAsyncFactory(ReportController.CreateRecord),
);

report.get(
  BASE_SUB,
  HandleAsyncFactory(ProtectRoutes),
  HandleAsyncFactory(UserGetValidator),
  HandleAsyncFactory(ReportController.GetAllReport),
);

export default report;
