import * as mongoose from 'mongoose';
import { Settings as SettingsProps } from '../Types/interfaces';

const Settings: mongoose.Schema = new mongoose.Schema(
  {
    maximumReloadThreshold: {
      type: mongoose.Schema.Types.Number,
    },
    minimumReloadThreshold: {
      type: mongoose.Schema.Types.Number,
    },
  },

  { autoIndex: false },
);

export default mongoose.model<SettingsProps>('settings', Settings);
