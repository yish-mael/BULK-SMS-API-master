import winston, { format } from 'winston';
import {
  FirebaseTransport,
  StorageType,
} from 'winston-firebase-transport';
import config from 'config';

const { combine, printf } = format;
const logFormat = printf(
  ({ level, message, label, timestamp }) =>
    `${timestamp} [${label}] ${level}: ${message}`,
);

const FirebaseTransportLogger = new FirebaseTransport({
  firebaseConfig: {
    apiKey: config.get('API_KEY'),
    authDomain: config.get('AUTH_DOMAIN'),
    projectId: config.get('PROJECT_ID'),
    storageBucket: config.get('STORAGE_BUCKET'),
    messagingSenderId: config.get('MESSENGER_ID'),
    appId: config.get('APP_ID'),
    databaseURL: config.get('DATABASE_URL'),
    measurementId: config.get('MEASUREMENT_ID'),
  },
  logger: {
    level: 'http',
    format: combine(
      winston.format.label({ label: 'Fatal Error' }),
      winston.format.timestamp(),
      logFormat,
    ),
  },
  applicationName: 'Hanwok-Authentication-Service',
  collectionName: 'Auth-Service-Logs',
  storageType: StorageType.Firestore, // StorageType.Realtime
});

const Logger = winston.createLogger({
  level: 'error',
  format: combine(
    winston.format.label({ label: 'Fatal Error' }),
    winston.format.timestamp(),
    logFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/combine.log' }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/info.log',
      level: 'info',
    }),
    FirebaseTransportLogger,
  ],
});

export const TestLogger = winston.createLogger({
  level: 'error',
  format: combine(
    winston.format.label({ label: 'Non Fatal Exception' }),
    winston.format.timestamp(),
    logFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/test.log',
      level: 'error',
    }),
  ],
});

export const InfoLogger = winston.createLogger({
  level: 'info',
  format: combine(
    winston.format.label({ label: 'Non Fatal Exception' }),
    winston.format.timestamp(),
    logFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/info.log',
      level: 'info',
    }),
  ],
});

export const HttpLogger = winston.createLogger({
  level: 'http',
  format: combine(
    winston.format.label({ label: 'Non Fatal Exception' }),
    winston.format.timestamp(),
    logFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/http.log',
      level: 'http',
    }),
    FirebaseTransportLogger,
  ],
});

export default Logger;
