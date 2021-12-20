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

export default async function GetAllContactGroup(
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

  const doc = await models.ContactGroup.paginate(paginationQuery, {
    ...paginationConfig,
    sort: { date: -1 },
    select: {
      hash: 0,
      salt: 0,
    },
    populate: 'contacts',
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

export async function GetSingleContactGroup(
  req: Request,
  res: Response,
) {
  const { id } = req.params as any;

  const contactGroup = await models.ContactGroup.findOne({
    _id: Types.ObjectId(id), // eslint-disable-line
  }).populate('contacts');
  return ProcessingSuccess(res, contactGroup);
}
