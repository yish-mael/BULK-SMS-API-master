import ValidateCreateSenderId from './add.senderid.validation';
import {
  ValidateDeleteSenderID,
  ValidateDeleteMultipleSender as ValidateDeleteMultipleSenderIds,
} from './delete.senderid.validation';
import ValidateUpdateSenderId from './update.senderid.validation';
import ValidateGetSenderID from './get.senderId.validation';

export default {
  ValidateCreateSenderId,
  ValidateDeleteSenderID,
  ValidateUpdateSenderId,
  ValidateDeleteMultipleSenderIds,
  ValidateGetSenderID,
};
