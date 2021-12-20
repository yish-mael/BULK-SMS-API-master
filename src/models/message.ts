import * as mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { MessageProps } from '../Types/interfaces';
import MessageStatus from '../constants/enums';

const Message: mongoose.Schema = new mongoose.Schema(
  {
    contacts: { type: mongoose.Schema.Types.Array },

    message: { type: mongoose.Schema.Types.String },

    sender: { type: mongoose.Schema.Types.String },

    status: {
      type: mongoose.Schema.Types.String,
      enum: [
        MessageStatus.APPROVED,
        MessageStatus.PENDING,
        MessageStatus.SENT,
      ],
      default: MessageStatus.PENDING,
    },

    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'department',
    },

    date: { type: mongoose.Schema.Types.Date, default: Date.now() },

    scheduleDate: { type: mongoose.Schema.Types.Date },
  },

  { autoIndex: false },
);

Message.index({ message: 'text' });
Message.plugin(mongoosePaginate);

export default mongoose.model<MessageProps>('message', Message);
