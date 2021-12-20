import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import {
  Entities,
  EntitiesAction,
  ACCOUNT_TYPE,
} from '../constants/enums';
import { Activities as ActivitiesProps } from '../Types/interfaces';

const { CREATE, UPDATE, DELETE, LOGIN, PASSWORD_RESSET } =
  EntitiesAction;
const {
  DEPARTMENTS,
  MESSAGES,
  CONTACTS,
  ROLES,
  SENDERIDS,
  EMPLOYEES,
  ADMIN,
  REPORTS,
  CONTACTS_GROUP,
  SETTINGS,
} = Entities;

const { ADMIN_ACCOUNT, AGENCY_ACCOUNT } = ACCOUNT_TYPE; // eslint-disable-line
const Activities: Schema = new Schema(
  {
    group: { type: Schema.Types.String },

    user: { type: Schema.Types.ObjectId, ref: 'employee' },

    admin: { type: Schema.Types.ObjectId, ref: 'admin' },

    userType: {
      type: Schema.Types.String,
      enum: [ADMIN_ACCOUNT, AGENCY_ACCOUNT],
    },

    type: {
      type: Schema.Types.String,
      enum: [CREATE, UPDATE, DELETE, LOGIN, PASSWORD_RESSET],
    },

    description: Schema.Types.String,

    entity: {
      type: Schema.Types.String,
      enum: [
        DEPARTMENTS,
        MESSAGES,
        CONTACTS,
        ROLES,
        SENDERIDS,
        EMPLOYEES,
        ADMIN,
        REPORTS,
        CONTACTS_GROUP,
        SETTINGS,
      ],
    },

    payload: {
      name: Schema.Types.String,
      email: Schema.Types.String,
      phoneNumber: Schema.Types.String,
      phoneNumbers: [Schema.Types.String],
      message: Schema.Types.String,
      id: Schema.Types.ObjectId,
      address: Schema.Types.String,
      department: Schema.Types.String,
      role: Schema.Types.String,
      mininumReloadThreshold: Schema.Types.Number,
      maximumReloadThreshold: Schema.Types.Number,
    },

    date: { type: Schema.Types.Date, default: Date.now() },
  },

  { autoIndex: false },
);

Activities.plugin(mongoosePaginate);

export default model<ActivitiesProps>('Activities', Activities);
