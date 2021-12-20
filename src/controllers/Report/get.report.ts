import { Request, Response } from 'express';
import {
  ProcessingGetRequestSuccess,
  ResourceNotFound,
} from '../../RequestStatus/status';
import models from '../../models';
import constants from '../../constants';
import { getQuery } from '../../utills/utills';

export default async function GetAllReport(
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

  const doc = await models.Reports.paginate(paginationQuery, {
    ...paginationConfig,
    sort: { date: -1 },
    select: {
      hash: 0,
      salt: 0,
    },
    populate: 'groupId employeeId',
  });

  if (!doc)
    return ResourceNotFound(
      res,
      constants.RequestResponse.ReportNotFound,
    );

  return ProcessingGetRequestSuccess(res, {
    payload: doc.docs,
    totalDoc: doc.totalDocs,
    totalPages: doc.totalPages,
  });
}
