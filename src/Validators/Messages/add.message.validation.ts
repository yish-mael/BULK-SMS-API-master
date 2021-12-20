import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { InvalidInputs } from '../../RequestStatus/status';

const requestBodySchema = joi.object({
  message: joi.string().required().label('Message'),
  sender: joi.string().optional().allow('').label('Sender'),
  groupId: joi.string().label('Group ID'),
  contacts: joi
    .array()
    .items(joi.string())
    .required()
    .label('Contacts'),
  scheduleDate: joi
    .date()
    .optional()
    .allow('')
    .label('Scheduled Date'),
});

export default function ValidateCreateMessage(
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
