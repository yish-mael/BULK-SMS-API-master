import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import mongoosePaginate from 'mongoose-paginate-v2';
import { EmployeeProps } from '../Types/interfaces';

const Employee: mongoose.Schema = new mongoose.Schema(
  {
    email: {
      type: mongoose.Schema.Types.String,
    },

    name: {
      type: mongoose.Schema.Types.String,
    },

    phoneNumberInternational: {
      type: mongoose.Schema.Types.String,
    },

    phoneNumber: {
      type: mongoose.Schema.Types.String,
    },

    countryCode: {
      type: mongoose.Schema.Types.String,
    },

    hash: {
      type: mongoose.Schema.Types.String,
    },

    salt: {
      type: mongoose.Schema.Types.String,
    },

    address: {
      type: mongoose.Schema.Types.String,
    },

    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'department',
    },

    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'role',
    },

    active: {
      type: mongoose.Schema.Types.Boolean,
      default: true,
    },
    date: {
      type: mongoose.Schema.Types.Date,
      default: Date.now(),
    },
  },

  { autoIndex: false },
);

Employee.methods.validatePassword = function validatePassword(
  password,
) {
  const documents = this as EmployeeProps;
  const hash = bcrypt.compareSync(password, documents.hash);
  return hash;
};
Employee.index({ name: 'text', email: 'text', address: 'text' });
Employee.methods.setPassword = function setPassword(password) {
  const documents = this as EmployeeProps;
  documents.salt = bcrypt.genSaltSync(10);
  documents.hash = bcrypt.hashSync(password, documents.salt);
};

Employee.plugin(mongoosePaginate);

export default mongoose.model<EmployeeProps>('employee', Employee);
