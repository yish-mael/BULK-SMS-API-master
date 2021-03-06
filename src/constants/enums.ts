/* eslint-disable */
enum MessageStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  SENT = 'SENT',
}

export enum Entities {
  MESSAGES = 'MESSAGES',
  CONTACTS = 'CONTACTS',
  ROLES = 'ROLES',
  EMPLOYEES = 'EMPLOYEES',
  SENDERIDS = 'SENDERIDS',
  DEPARTMENTS = 'DEPARTMENTS',
  ADMIN = 'ADMIN',
  REPORTS = 'REPORTS',
  CONTACTS_GROUP = 'CONTACT GROUP',
  SETTINGS = 'SETTINGS',
}

export enum ReportStatus {
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
  INPROGRESS = 'INPROGRESS',
  RECEIVED = 'RECIEVED',
  DEFAULT = 'DEFAULT',
}

export enum EntitiesAction {
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  CREATE = 'CREATE',
  LOGIN = 'LOGIN',
  PASSWORD_RESSET = 'PASSWORD-RESSET',
}

export enum ACCOUNT_TYPE {
  ADMIN_ACCOUNT = 'ADMIN-ACCOUNT',
  AGENCY_ACCOUNT = 'AGENCY-ACCOUNT',
}

export default MessageStatus;
