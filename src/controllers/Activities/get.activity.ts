import { Request, Response } from 'express';
import { ProcessingGetRequestSuccess } from '../../RequestStatus/status';
import models from '../../models';
import { getQuery } from '../../utills/utills';

export default async function AllActivity(
  req: Request,
  res: Response,
) {
  const requestParams = req.query as any;

  const { paginationConfig, paginationQuery } = getQuery(
    requestParams,
    {
      uid: '',
      agency: 'group',
      roles: 'roleId',
      userType: 'userType',
    },
  );

  const doc = await models.Activities.paginate(
    { ...paginationQuery },
    {
      ...paginationConfig,
      populate: 'user admin',
      sort: { date: -1 },
    },
  );

  return ProcessingGetRequestSuccess(res, {
    payload: doc.docs,
    totalDoc: doc.totalDocs,
    totalPages: doc.totalPages,
  });
}
