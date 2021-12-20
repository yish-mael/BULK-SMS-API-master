import ValidateDeleteEmployee from './delete.employee.validation';
import ValidateCreateEmployee from './add.employee.validation';
import {
  ValidateUpdateEmployee,
  ValidateAssignEmployeeToDepartment,
  ValidateAssignEmployeeToRole,
} from './update.employee.validation';
import ValidateGetSingleEmployee, {
  ValidateGetEmployeesByGroup,
} from './get.employee.validation';

export default {
  ValidateCreateEmployee,
  ValidateUpdateEmployee,
  ValidateAssignEmployeeToDepartment,
  ValidateAssignEmployeeToRole,
  ValidateGetSingleEmployee,
  ValidateGetEmployeesByGroup,
  ValidateDeleteEmployee,
};
