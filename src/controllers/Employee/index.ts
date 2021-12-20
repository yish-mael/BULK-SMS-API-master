import CreateEmployee from './add.employee';
import DeleteMultipleEmployee from './delete.employee';
import {
  UpdateEmployee,
  AssignEmployeeToDepartment,
  AssignEmployeeToRole,
} from './update.employee';
import {
  GetAllEmployee,
  GetSingleEmployee,
  GetAllEmployeeByAgency,
} from './get.employee';
import RequestRessetEmail, {
  RessetPassword,
} from './resset.passwords';

export default {
  CreateEmployee,
  UpdateEmployee,
  GetAllEmployee,
  GetSingleEmployee,
  AssignEmployeeToDepartment,
  AssignEmployeeToRole,
  GetAllEmployeeByAgency,
  DeleteMultipleEmployee,
  RequestRessetEmail,
  RessetPassword,
};
