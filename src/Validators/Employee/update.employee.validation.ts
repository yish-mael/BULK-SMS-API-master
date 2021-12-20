import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { InvalidInputs } from '../../RequestStatus/status';

const requestBodySchema = joi.object({
  id: joi.string().required().label('Employee ID'),

  updates: joi.object({
    email: joi.string(),
    name: joi.string(),
    countryCode: joi.string(),
    phoneNumber: joi.string(),
    address: joi.string(),
    groupId: joi.string(),
    roleId: joi.string(),
    active: joi.boolean(),
  }),
});

const requestBodySchemaAssignEmployeeToDept = joi.object({
  employeeId: joi.string().required().label('Employee ID'),
  departmentId: joi.string().required().label('department ID'),
});

const requestBodySchemaAssignEmployeeToRole = joi.object({
  employeeId: joi.string().required().label('Employee ID'),
  roleId: joi.string().required().label('roid ID'),
});

export function ValidateUpdateEmployee(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = requestBodySchema.validate(req.body, {
    errors: {
      wrap: {
        label: '',
      },
    },
  });

  if (error) {
    return InvalidInputs(res, error.message);
  }
  next();
}

export function ValidateAssignEmployeeToDepartment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = requestBodySchemaAssignEmployeeToDept.validate(
    req.body,
    {
      errors: {
        wrap: {
          label: '',
        },
      },
    },
  );

  if (error) {
    return InvalidInputs(res, error.message);
  }
  next();
}

export function ValidateAssignEmployeeToRole(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = requestBodySchemaAssignEmployeeToRole.validate(
    req.body,
    {
      errors: {
        wrap: {
          label: '',
        },
      },
    },
  );

  if (error) {
    return InvalidInputs(res, error.message);
  }
  next();
}
