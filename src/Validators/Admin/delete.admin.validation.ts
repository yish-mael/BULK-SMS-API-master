import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { InvalidInputs } from '../../RequestStatus/status';

const requestBodySchema = joi.object({
  adminIds: joi.array().items(joi.string()).label('adminIds'),
});

export default function ValidateMultipleDeleteAdmin(
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
