import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { InvalidInputs } from '../../RequestStatus/status';

const requestBodySchema = joi.object({
  id: joi.string().required().label('Sender ID'),
});

export function ValidateDeleteSenderID(
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

const requestBodySchemaMultiple = joi.object({
  senderIds: joi.array().items(joi.string()).label('senderIds'),
});

export function ValidateDeleteMultipleSender(
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
    return InvalidInputs(res, error.message);
  }
  next();
}
