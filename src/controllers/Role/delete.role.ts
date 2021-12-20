import { Request, Response } from 'express';
import { Types } from 'mongoose';
import {
  ProcessingSuccess,
  ResourceNotFound,
} from '../../RequestStatus/status';
import models from '../../models';
import constants from '../../constants';
import {
  ACCOUNT_TYPE,
  Entities,
  EntitiesAction,
} from '../../constants/enums';

export async function DeleteRole(req: Request, res: Response) {
  const { id } = req.params;

  const doc = await models.Role.findOneAndDelete({ _id: id });
  if (!doc)
    return ResourceNotFound(
      res,
      constants.RequestResponse.RoleNotFound,
    );

  // ACTIVITY LOGGER
  // ============================

  const Activity = new models.Activities({
    group: '',
    userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
    admin: res.locals.id, // eslint-disable-line
    user: res.locals.id,
    entity: Entities.ROLES,
    type: EntitiesAction.DELETE,
    description: 'Role deleted',
    payload: {
      name: doc?.name,
      id: doc?._id, // eslint-disable-line
    },
    date: new Date(),
  });

  await Activity.save();
  return ProcessingSuccess(res, doc);
}

export async function DeleteMultipleRole(
  req: Request,
  res: Response,
) {
  const { roleIds } = req.body as {
    roleIds: string[];
  };

  const formatIds: Types.ObjectId[] = [];
  roleIds.forEach((id: string) => {
    formatIds.push(Types.ObjectId(id));
  });

  const DeletedRoles: any[] = [];

  const roles = await models.Role.find({
    _id: { $in: formatIds }, // eslint-disable-line;
  });
  // eslint-disable-next-line
  for (let role of roles) {
    // eslint-disable-next-line

    DeletedRoles.push({
      group: '',
      userType: ACCOUNT_TYPE.ADMIN_ACCOUNT,
      admin: res.locals.id, // eslint-disable-line
      user: res.locals.id,
      entity: Entities.ROLES,
      type: EntitiesAction.DELETE,
      description: 'Role  deleted',
      payload: {
        name: role?.name,
        id: role?._id, // eslint-disable-line
      },
      date: new Date(),
    });
  }
  const Activity = new models.Activities();

  const doc = await models.Role.deleteMany({
    _id: { $in: formatIds },
  });

  await Activity.collection.insertMany(DeletedRoles);

  return ProcessingSuccess(res, doc);
}
