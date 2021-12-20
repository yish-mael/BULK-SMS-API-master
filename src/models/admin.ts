import { Schema, model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import mongoosePaginate from 'mongoose-paginate-v2';
import { AdminProps } from '../Types/interfaces';

const Admin: Schema = new Schema(
  {
    email: {
      type: Schema.Types.String,
    },

    phoneNumber: {
      type: Schema.Types.String,
    },

    phoneNumberInternational: {
      type: Schema.Types.String,
    },

    countryCode: {
      type: Schema.Types.String,
    },

    name: {
      type: Schema.Types.String,
    },

    hash: {
      type: Schema.Types.String,
    },

    salt: {
      type: Schema.Types.String,
    },
    date: {
      type: Schema.Types.Date,
      default: Date.now(),
    },
  },

  { autoIndex: false },
);

Admin.methods.validatePassword = function validatePassword(password) {
  const documents = this as AdminProps;
  const hash = bcrypt.compareSync(password, documents.hash);
  return hash;
};

Admin.index({ name: 'text', email: 'text' });
Admin.plugin(mongoosePaginate);
Admin.methods.setPassword = function setPassword(password) {
  const documents = this as AdminProps;
  documents.salt = bcrypt.genSaltSync(10);
  documents.hash = bcrypt.hashSync(password, documents.salt);
};

export default model<AdminProps>('admin', Admin);
