import { Request, Response } from 'express';
import {
  ProcessingGetRequestSuccess,
  ProcessingSuccess,
  ResourceNotFound,
} from '../../RequestStatus/status';
import models from '../../models';
import constants from '../../constants';
import { getQuery } from '../../utills/utills';

export async function GetAllDepartment(req: Request, res: Response) {
  const requestParams = req.query as any;
  const { paginationConfig, paginationQuery } = getQuery(
    requestParams,
    {
      uid: '',
      agency: 'senderIds',
      roles: '',
    },
  );

  const doc = await models.Department.paginate(paginationQuery, {
    ...paginationConfig,
    sort: { date: -1 },
    select: {
      hash: 0,
      salt: 0,
    },
    populate: 'senderIds',
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

export async function GetSingleDepartment(
  req: Request,
  res: Response,
) {
  const { id } = req.params;

  const doc = await models.Department.findOne({ _id: id }).populate(
    'senderIds',
  );

  if (!doc)
    return ResourceNotFound(
      res,
      constants.RequestResponse.DepartmentNotFoundWithId,
    );

  return ProcessingSuccess(res, doc);
}
