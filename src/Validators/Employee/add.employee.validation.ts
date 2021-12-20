import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { InvalidInputs } from '../../RequestStatus/status';

const requestBodySchema = joi.object({
  email: joi.string().label('Email'),
  name: joi.string().required().label('Name'),
  password: joi.string().required().label('Password'),
  phoneNumber: joi.string().allow(''),
  countryCode: joi.string().length(2).allow(''),
  address: joi.string().required().label('Address'),
  groupId: joi.string().label('Group ID'),
  roleId: joi.string().label('Role ID'),
});

export default function ValidateCreateEmployee(
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
