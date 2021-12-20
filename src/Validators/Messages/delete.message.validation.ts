import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { InvalidInputs } from '../../RequestStatus/status';

const requestBodySchema = joi.object({
  id: joi.string().required().label('Message ID'),
});

export function ValidateDeleteMessage(
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
  messageIds: joi.array().items(joi.string()).label('messageIds'),
});

export function ValidateMultipleDeleteMessage(
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
