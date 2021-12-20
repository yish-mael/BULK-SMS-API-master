import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { InvalidInputs } from '../../RequestStatus/status';

const requestBodySchema = joi.object({
  pageNumber: joi.number().required(),
  pageSize: joi.number().required(),
  searchText: joi.string().optional().allow(''),
  agency: joi.string().optional().allow(''),
  uid: joi.string().optional().allow(''),
  userType: joi.string().optional().allow(''),
  role: joi.string().optional().allow(''),
});

export default function ValidateCreateContact(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = requestBodySchema.validate(req.query, {
    errors: {
      wrap: {
        label: '',
      },
    },
  });

  if (error) {
    console.log('validation error', error);
    return InvalidInputs(res, error.message);
  }
  next();
}
