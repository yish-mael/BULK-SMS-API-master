import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { InvalidInputs } from '../../RequestStatus/status';

const requestBodySchema = joi.object({
  email: joi.string().label('Email'),
  phoneNumber: joi.string().allow(''),
  countryCode: joi.string().length(2).allow(''),
  name: joi.string().required().label('Name'),
  password: joi.string().required().label('Password'),
});

export default function ValidateCreateAdmin(
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
