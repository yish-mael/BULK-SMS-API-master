import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { InvalidInputs } from '../../RequestStatus/status';

const requestBodySchema = joi.object({
  id: joi.string().required().label('Role ID'),

  updates: joi.object({
    sendMessage: joi.boolean(),
    readMessage: joi.boolean(),
    addContact: joi.boolean(),
    composeMessage: joi.boolean(),
    name: joi.string(),
  }),
});

export default function ValidateUpdateRole(
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
