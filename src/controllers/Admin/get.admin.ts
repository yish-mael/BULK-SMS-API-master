import { Request, Response } from 'express';
import {
  ProcessingGetRequestSuccess,
  ProcessingSuccess,
  ResourceNotFound,
} from '../../RequestStatus/status';
import models from '../../models';
import constants from '../../constants';
import { getQuery } from '../../utills/utills';

export async function GetAllAdmin(req: Request, res: Response) {
  const requestParams = req.query as any;

  // CUSTOM QUERY COMPOSER
  const { paginationConfig, paginationQuery } = getQuery(
    requestParams,
    {
      uid: '',
      agency: '',
      roles: '',
    },
  );

  const doc = await models.Admin.paginate(paginationQuery, {
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
      constants.RequestResponse.AdminNotFound,
    );

  return ProcessingGetRequestSuccess(res, {
    payload: doc.docs,
    totalDoc: doc.totalDocs,
    totalPages: doc.totalPages,
  });
}

export async function GetSingleAdmin(req: Request, res: Response) {
  const { id } = req.params;

  const doc = await models.Admin.findOne({ _id: id }).select({
    hash: 0,
    salt: 0,
  });

  if (!doc)
    return ResourceNotFound(
      res,
      constants.RequestResponse.AdminNotFoundWithId,
    );

  return ProcessingSuccess(res, doc);
}
