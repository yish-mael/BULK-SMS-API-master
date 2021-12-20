import CreateAdmin from './add.admin';
import UpdateAdmin from './update.admin';
import DeleteMultipleAdmin from './delete.admin';
import { GetAllAdmin, GetSingleAdmin } from './get.admin';
import RequestRessetEmail, {
  RessetPassword,
} from './password.resets';

export default {
  CreateAdmin,
  UpdateAdmin,
  GetAllAdmin,
  GetSingleAdmin,
  DeleteMultipleAdmin,
  RequestRessetEmail,
  RessetPassword,
};
