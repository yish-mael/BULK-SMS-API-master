import { Router } from 'express';
import ContactGroupController from '../controllers/ContactGroup';
import Validation from '../Validators/ContactGroup';
import constants from '../constants/index';
import HandleAsyncFactory from '../Middlewares/async.error.handler';
import ProtectRoutes from '../Middlewares/check.route.access';
import AddContactPermission from '../Middlewares/permission.checker/permission.add.contact';
import UserGetValidator from '../Validators/Get.Requests/user.get.validator';

const { GET_ID_PARAM, BASE_SUB } = constants.RoutesSubs;
const contactGroup = Router();

contactGroup.post(
  BASE_SUB,
  HandleAsyncFactory(ProtectRoutes),
  HandleAsyncFactory(AddContactPermission),
  HandleAsyncFactory(Validation.ValidateCreateContactGroup),
  HandleAsyncFactory(ContactGroupController.CreateContactGroup),
);

contactGroup.put(
  BASE_SUB,
  HandleAsyncFactory(ProtectRoutes),
  HandleAsyncFactory(AddContactPermission),
  HandleAsyncFactory(Validation.ValidateUpdateContactGroup),
  HandleAsyncFactory(ContactGroupController.UpdateContactGroup),
);

// Admin: Contact Routes
contactGroup.get(
  BASE_SUB,
  HandleAsyncFactory(ProtectRoutes),
  HandleAsyncFactory(UserGetValidator),
  HandleAsyncFactory(ContactGroupController.GetAllContactGroup),
);

contactGroup.delete(
  BASE_SUB,
  HandleAsyncFactory(ProtectRoutes),
  HandleAsyncFactory(Validation.ValidateMultipleDeleteContactsGroup),
  HandleAsyncFactory(
    ContactGroupController.DeleteMultipleContactsGroup,
  ),
);

contactGroup.get(
  GET_ID_PARAM,
  HandleAsyncFactory(ProtectRoutes),
  HandleAsyncFactory(Validation.ValidateGetSingleContactGroup),
  HandleAsyncFactory(ContactGroupController.GetSingleContactGroup),
);

export default contactGroup;
