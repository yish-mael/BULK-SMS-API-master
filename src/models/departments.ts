import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { DepartmentProps } from '../Types/interfaces';

const Department: Schema = new Schema(
  {
    credit: {
      type: Number,
    },
    name: {
      type: Schema.Types.String,
    },
    senderIds: {
      type: [Schema.Types.ObjectId],
      ref: 'senderID',
    },
    date: {
      type: Schema.Types.Date,
      default: Date.now(),
    },
  },
  { autoIndex: false },
);

Department.index({ name: 'text' });
Department.plugin(mongoosePaginate);

export default model<DepartmentProps>('department', Department);
