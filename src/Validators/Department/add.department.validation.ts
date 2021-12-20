import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { InvalidInputs } from '../../RequestStatus/status';

const requestBodySchema = joi.object({
  credit: joi.number().optional().allow('').label('credit'),
  name: joi.string().required().label('Name'),
  senderIds: joi.array().items(joi.string()).optional(),
});

export default function ValidateCreateDepartment(
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
    console.log(error);
    return InvalidInputs(res, error.message);
  }
  next();
}
