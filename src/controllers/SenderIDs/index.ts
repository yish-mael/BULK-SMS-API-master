import AddSenderId from './add.senderid';
import {
  DeleteSenderId,
  DeleteMultipleSenders as DeleteMultipleSenderIds,
} from './delete.senderid';
import UpdateSenderId from './update.senderid';
import GetAllSenderId, { GetSingleSenderID } from './get.senderid';

export default {
  AddSenderId,
  UpdateSenderId,
  GetAllSenderId,
  DeleteSenderId,
  DeleteMultipleSenderIds,
  GetSingleSenderID,
};
