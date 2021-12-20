import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { InvalidInputs } from '../../RequestStatus/status';

const requestBodySchema = joi.object({
  pageNumber: joi.number().required(),
  pageSize: joi.number().required(),
  userType: joi.string().optional().allow(''),
  searchText: joi.string().optional().allow(''),
  agency: joi.string().required(),
  status: joi.string().optional().allow(''),
  uid: joi.string().optional().allow(''),
  role: joi.string().optional().allow(''),
  startDate: joi.string().optional().allow(''),
  endDate: joi.string().optional().allow(''),
});

export default function UserGetValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(req.query);
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
