import { Request, Response } from 'express';
import { ProcessingSuccess } from '../../RequestStatus/status';
import models from '../../models';
import { getAccountDetails } from '../../utills/utills';

export default async function GetApplicationInfo(
  req: Request,
  res: Response,
) {
  const {
    totalAmountAllocated,
    totalBalance,
    balanceAfterAllocation,
  } = await getAccountDetails();
  const getSettings = await models.Settings.findOne({});
  const payload = {
    settings: getSettings?.toObject(),
    totalBalance,
    totalAllocation: totalAmountAllocated,
    balanceAfterAllocation,
  };

  return ProcessingSuccess(res, payload);
}
