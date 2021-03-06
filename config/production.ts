require('dotenv/config');

const {
  JWT_SIGN,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  SINCH_KEY,
  SINCH_SECRET,
  NUMVERIFY_SECRET,
  GEOCODING_APIKEY,
  PAYSTACK_SECRET,
  PORT,
  JWT_AUDIENCE,
  JWT_ISSUER,
  TWILIO_AUTH_TOKEN,
  TWILIO_ACCOUNT_SID,
  TWILIO_MESSAGING_SID,
  TWILIO_PHONE_NUMBER,
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSENGER_ID,
  APP_ID,
  MEASUREMENT_ID,
  CLUSTER,
  MAILJET_PUBLIC,
  MAILJET_PRIVATE,
  AFRICATALKING_API_KEY,
  AFRICATALKING_API_USERNAME,
} = process.env;

export default {
  JWT_SIGN,
  SINCH_KEY,
  SINCH_SECRET,
  NUMVERIFY_SECRET,
  GEOCODING_APIKEY,
  PAYSTACK_SECRET,
  PORT,
  DB_CONNECTION_STRING: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  JWT_ISSUER: JWT_AUDIENCE,
  JWT_AUDIENCE: JWT_ISSUER,
  JWT_ALGO: 'RS256',
  APP_TEST_ENDPOINT: '',
  TWILIO_AUTH_TOKEN,
  TWILIO_ACCOUNT_SID,
  TWILIO_MESSAGING_SID,
  TWILIO_PHONE_NUMBER,
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSENGER_ID,
  APP_ID,
  MEASUREMENT_ID,
  MAILJET_PUBLIC,
  MAILJET_PRIVATE,
  AFRICATALKING_API_KEY,
  AFRICATALKING_API_USERNAME,
};
