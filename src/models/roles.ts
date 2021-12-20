import * as mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { RoleProps } from '../Types/interfaces';

const Role: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
    },

    sendMessage: {
      type: Boolean,
    },

    composeMessage: {
      type: Boolean,
      default: false,
    },

    readMessage: {
      type: Boolean,
    },

    addContact: {
      type: Boolean,
    },
    date: {
      type: mongoose.Schema.Types.Date,
      default: Date.now(),
    },
  },

  { autoIndex: false },
);
Role.index({ name: 'text' });
Role.plugin(mongoosePaginate);
export default mongoose.model<RoleProps>('role', Role);
