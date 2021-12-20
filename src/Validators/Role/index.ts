import ValidateCreateRole from './add.role.validation';
import ValidateUpdateRole from './update.role.validation';
import {
  ValidateDeleteRole,
  ValidateDeleteMultipleRole,
} from './delete.role.validation';
import ValidateGetSingleRole from './get.role.validation';

export default {
  ValidateCreateRole,
  ValidateUpdateRole,
  ValidateGetSingleRole,
  ValidateDeleteRole,
  ValidateDeleteMultipleRole,
};
