import { Router } from 'express';
import SenderIdController from '../controllers/SenderIDs';
import constants from '../constants/index';
import ProtectRoutes from '../Middlewares/check.route.access';
import HandleAsyncFactory from '../Middlewares/async.error.handler';
import UserGetValidator from '../Validators/Get.Requests/user.get.validator';

const { BASE_SUB } = constants.RoutesSubs;
const senderID = Router();

senderID.get(
  BASE_SUB,
  HandleAsyncFactory(ProtectRoutes),
  HandleAsyncFactory(UserGetValidator),
  HandleAsyncFactory(SenderIdController.GetAllSenderId),
);

export default senderID;
