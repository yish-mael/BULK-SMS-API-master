import * as mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ContactGroupProps } from '../Types/interfaces';

const Contact: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
    },

    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contact',
        default: [],
      },
    ],

    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'department',
    },

    date: {
      type: mongoose.Schema.Types.Date,
      default: Date.now(),
    },
  },

  { autoIndex: false },
);

Contact.index({ name: 'text' });
Contact.plugin(mongoosePaginate);

export default mongoose.model<ContactGroupProps>(
  'contact_group',
  Contact,
);
