import * as mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { SenderIds } from '../Types/interfaces';

const SenderID: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
    },
    date: {
      type: mongoose.Schema.Types.Date,
      default: Date.now(),
    },
  },

  { autoIndex: false },
);

SenderID.index({ name: 'text' });
SenderID.plugin(mongoosePaginate);
export default mongoose.model<SenderIds>('senderID', SenderID);
