require('dotenv/config');

const {
  SINCH_KEY,
  SINCH_SECRET,
  NUMVERIFY_SECRET,
  GEOCODING_APIKEY,
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
} = process.env;

export default {
  JWT_SIGN: 'my-secret', // secret for decoding jwts token
  SINCH_KEY, // sinch key ==> you can get this by signing up with sinch and a free $2
  SINCH_SECRET, // sinch secret
  NUMVERIFY_SECRET, // you can get this by signing up to numverify
  GEOCODING_APIKEY, // you can get this by from google cloud
  PAYSTACK_SECRET: '', // signup to paystack !!
  PORT: 8081,
  DB_CONNECTION_STRING: 'mongodb://localhost/hanwok-auth-service',
  JWT_ISSUER: 'https://example.com/example',
  JWT_AUDIENCE: '76rghjklkjh',
  JWT_ALGO: 'RS256',
  APP_TEST_ENDPOINT: 'http://localhost:8081',
  TWILIO_AUTH_TOKEN,
  TWILIO_ACCOUNT_SID,
  TWILIO_MESSAGING_SID,
  TWILIO_PHONE_NUMBER,
  MAILJET_PUBLIC,
  MAILJET_PRIVATE,

  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSENGER_ID,
  APP_ID,
  MEASUREMENT_ID,
};
