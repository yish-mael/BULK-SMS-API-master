import { Request, Response } from 'express';
import {
  ProcessingGetRequestSuccess,
  ProcessingSuccess,
  ResourceNotFound,
} from '../../RequestStatus/status';
import models from '../../models';
import constants from '../../constants';
import { getQuery } from '../../utills/utills';

export async function GetAllEmployee(req: Request, res: Response) {
  const requestParams = req.query as any;

  const { paginationConfig, paginationQuery } = getQuery(
    requestParams,
    {
      uid: '',
      agency: 'groupId',
      roles: 'roleId',
    },
  );

  const doc = await models.Employee.paginate(paginationQuery, {
    ...paginationConfig,
    sort: { date: -1 },
    select: {
      hash: 0,
      salt: 0,
    },
    populate: 'groupId roleId',
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

export async function GetAllEmployeeByAgency(
  req: Request,
  res: Response,
) {
  const { groupId } = req.params; // department, group or agancy ID
  const doc = await models.Employee.find({ groupId })
    .populate('groupId roleId')
    .sort({ date: -1 });

  if (!doc)
    return ResourceNotFound(
      res,
      constants.RequestResponse.EmployeeNotFound,
    );

  return ProcessingSuccess(res, doc);
}

export async function GetSingleEmployee(req: Request, res: Response) {
  const { id } = req.params;

  const doc = await models.Employee.findOne({ _id: id })
    .populate('roleId groupId')
    .select({
      hash: 0,
      salt: 0,
    });

  if (!doc)
    return ResourceNotFound(
      res,
      constants.RequestResponse.EmployeeNotFoundWithId,
    );

  return ProcessingSuccess(res, doc);
}
