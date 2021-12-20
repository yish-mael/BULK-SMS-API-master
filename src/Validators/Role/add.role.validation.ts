import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { InvalidInputs } from '../../RequestStatus/status';

const requestBodySchema = joi.object({
  sendMessage: joi.boolean().required().label('send message'),
  readMessage: joi.boolean().required().label('read Message'),
  addContact: joi.boolean().required().label('add Contact'),
  composeMessage: joi.boolean().required().label('Compose message'),
  name: joi.string().required().label('name'),
});

export default function ValidateCreateRole(
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
