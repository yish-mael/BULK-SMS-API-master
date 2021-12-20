const INVALID_PASSWORD =
  'password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters';

const INVALID_CREDENTIALS =
  'The credentials provided is invalid please check the credentials and retry.';

const USER_SUSPENDED =
  'A failed suspicious attempt was detected in accessing your account please retry after some time.';

const MAX_PIN_TRIAL =
  'Maximum trial for pin exceeded, make sure you have the valid credential and request another pin';

const PIN_NOT_TIMED_OUT =
  'Mulitiple request detected to verify a single account please try after some time.';

const INCORRECT_PASSWORD = 'Incorrect password please try again.';

const USER_EXIST =
  'Email or  phone number  is already in use by another account, please use a different email or phone number';

const SERVER_ERROR =
  'An unexpected error is preventing the server from processing the request please try again later.';

const UNAUTHORIZED =
  'The user is not authorized to access this resource, please make sure the accessToken is valid and the user credential valid';

const UNVERIFIED_ACCOUNT =
  'This account is not verified, please verify account before attempting to use this account.';

const INCORRECT_PIN =
  'Incorrect verification pin, please provide the correct pin and try again.';
const VERIFICATION_TOKEN_EXPIRE =
  'Pin verification timeout please request another pin.';

const USER_NOT_EXIST = 'The user does not exist';

const REQUEST_NOT_ALLOWED =
  'Request not allowed, you might be trying to perform an operation that is not allowed e.g updating a message after it is sent';

const QUTO_LIMIT_EXCEEDED =
  'You have exhausted your allocation quota please top up your subscription to be able to allocate SMS credit.';

const MAXIMUM_ALLOCATION_QUTO_EXCEEDED =
  'You have exceeded the maximum reload threshold, adjust the amount and try again';

const MINIMUM_ALLOCATION_QUOTA_NOT_ATTAINED =
  'Credit amount does not satisfy the minimum reload threshold, please adjust the amount and try again.';
export default {
  QUTO_LIMIT_EXCEEDED,
  MINIMUM_ALLOCATION_QUOTA_NOT_ATTAINED,
  MAXIMUM_ALLOCATION_QUTO_EXCEEDED,
  REQUEST_NOT_ALLOWED,
  USER_NOT_EXIST,
  INVALID_PASSWORD,
  INVALID_CREDENTIALS,
  USER_SUSPENDED,
  MAX_PIN_TRIAL,
  PIN_NOT_TIMED_OUT,
  INCORRECT_PASSWORD,
  USER_EXIST,
  SERVER_ERROR,
  UNAUTHORIZED,
  UNVERIFIED_ACCOUNT,
  INCORRECT_PIN,
  VERIFICATION_TOKEN_EXPIRE,
};
