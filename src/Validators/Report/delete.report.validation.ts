import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { InvalidInputs } from '../../RequestStatus/status';

const requestBodySchema = joi.object({
  id: joi.string().required().label('Record ID'),
});

const requestBodySchemaMultiple = joi.object({
  reportIds: joi.array().items(joi.string()).label('reportIds'),
});

export function ValidateDeleteReport(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = requestBodySchema.validate(req.params, {
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

export function ValidateMultipleDeleteReports(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = requestBodySchemaMultiple.validate(req.body, {
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
