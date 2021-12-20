import { Router } from 'express';
import MessageController from '../controllers/Messages';
import Validation from '../Validators/Messages';
import ProtectRoutes from '../Middlewares/check.route.access';
import SendMessagePermission from '../Middlewares/permission.checker/permission.sendmessage';
import ComposeMessagePermission from '../Middlewares/permission.checker/permission.compose.message';
import constants from '../constants/index';
import HandleAsyncFactory from '../Middlewares/async.error.handler';
import UserGetValidator from '../Validators/Get.Requests/user.get.validator';

const {
  GET_ID_PARAM,
  BASE_SUB,
  DELETE_MULTIPLE_MESSAGES,
  SEND_MESSAGE,
} = constants.RoutesSubs;
const message = Router();

message.post(
  BASE_SUB,
  HandleAsyncFactory(ProtectRoutes),
  HandleAsyncFactory(ComposeMessagePermission),
  HandleAsyncFactory(Validation.ValidateCreateMessage),
  HandleAsyncFactory(MessageController.CreateMessage),
);

message.put(
  BASE_SUB,
  HandleAsyncFactory(ProtectRoutes),
  HandleAsyncFactory(Validation.ValidateUpdateMessage),
  HandleAsyncFactory(MessageController.UpdateMessage),
);

message.delete(
  DELETE_MULTIPLE_MESSAGES,
  HandleAsyncFactory(ProtectRoutes),
  HandleAsyncFactory(Validation.ValidateMultipleDeleteMessage),
  HandleAsyncFactory(MessageController.DeleteMultipleMessage),
);

message.delete(
  GET_ID_PARAM,
  HandleAsyncFactory(ProtectRoutes),
  HandleAsyncFactory(Validation.ValidateDeleteMessage),
  HandleAsyncFactory(MessageController.DeleteMessage),
);

message.get(
  BASE_SUB,
  HandleAsyncFactory(ProtectRoutes),
  HandleAsyncFactory(UserGetValidator),
  HandleAsyncFactory(MessageController.GetAllMessages),
);

message.put(
  SEND_MESSAGE,
  HandleAsyncFactory(ProtectRoutes),
  HandleAsyncFactory(SendMessagePermission),
  HandleAsyncFactory(Validation.ValidateUpdateMessage),
  HandleAsyncFactory(MessageController.SendMessage),
);
export default message;
