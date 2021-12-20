import * as joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { InvalidInputs } from '../../RequestStatus/status';

const requestBodySchema = joi.object({
  id: joi.string().required().label('Contact group ID'),
});

const requestBodySchemaMultiple = joi.object({
  contactGroupIds: joi
    .array()
    .items(joi.string())
    .label('contact group ids'),
});

export function ValidateDeleteContactGroup(
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

export function ValidateMultipleDeleteContactsGroup(
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
