import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { InvalidInputs } from '../../RequestStatus/status';

const requestBodySchema = joi.object({
  contacts: joi
    .array()
    .items(
      joi
        .object({
          number: joi.string().required().label('Phone Number'),
          name: joi.string().required().label('Name'),
          groupId: joi.string().label('Group ID').required(),
          countryCode: joi
            .string()
            .length(2)
            .required()
            .label('Country code'),
        })
        .required(),
    )
    .required(),
});

export default function ValidateCreateContact(
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
