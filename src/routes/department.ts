import { Router } from 'express';
import DepartmentController from '../controllers/Department';
import Validation from '../Validators/Department';
import ProtectRoutes from '../Middlewares/check.route.access';
import constants from '../constants/index';
import HandleAsyncFactory from '../Middlewares/async.error.handler';

const { GET_ID_PARAM } = constants.RoutesSubs;
const department = Router();

department.get(
  GET_ID_PARAM,
  HandleAsyncFactory(ProtectRoutes),
  HandleAsyncFactory(Validation.ValidateGetSingleDepartment),
  HandleAsyncFactory(DepartmentController.GetSingleDepartment),
);

export default department;
