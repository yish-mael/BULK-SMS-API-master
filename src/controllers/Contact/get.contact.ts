import { Request, Response } from 'express';
import { Types } from 'mongoose';
import {
  ProcessingGetRequestSuccess,
  ProcessingSuccess,
  ResourceNotFound,
} from '../../RequestStatus/status';
import models from '../../models';
import constants from '../../constants';
import { getQuery } from '../../utills/utills';

export default async function GetAllContact(
  req: Request,
  res: Response,
) {
  const requestParams = req.query as any;
  const { paginationConfig, paginationQuery } = getQuery(
    requestParams,
    {
      uid: '',
      agency: 'groupId',
      roles: '',
    },
  );

  const doc = await models.Contact.paginate(paginationQuery, {
    ...paginationConfig,
    sort: { date: -1 },
    select: {
      hash: 0,
      salt: 0,
    },
  });

  if (!doc)
    return ResourceNotFound(
      res,
      constants.RequestResponse.ContactNotFound,
    );

  return ProcessingGetRequestSuccess(res, {
    payload: doc.docs,
    totalDoc: doc.totalDocs,
    totalPages: doc.totalPages,
  });
}

export async function GetSingleContact(req: Request, res: Response) {
  const { id } = req.params as any;

  const contact = await models.Contact.findOne({
    _id: Types.ObjectId(id), // eslint-disable-line
  });
  return ProcessingSuccess(res, contact);
}
