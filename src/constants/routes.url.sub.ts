// ROUTES SUB URLS

// LOGIN
const LOGIN = '/';

// SIGNUP
const SIGNUP = '/';

// TOKEN MANAGEMENT
const TOKEN_MANAGEMENT = '/refresh'; // manage tokens

// VERIFICATION
const VERIFICATION = '/';
const VERIFICATION_CALL = '/call'; // verification
const VERIFICATION_SMS = '/sms'; // verification
const VERIFICATION_CODE = '/code'; // verification
const VERIFIFY_CODE = '/verify-code'; // verification

// RESET PASSWORD

// ACTIVITIES
const ACTIVITIES = '/activities';

// SETTINGS
const SETTINGS = '/settings';

// PROFILE
const GET_PROFILE = '/:uid';
const PROFILE = '/';

// Department Endpoint
const CREATE_DEPARTMENT = '/create-department';
const GET_DEPARTMENT = '/get-department';
const UPDATE_DEPARTMENT = '/update-department';
const ADD_CREDIT = '/add-credit';

// Contact Endpoint
const GET_CONTACT = '/get-contact';
const DELETE_MULTIPLE_CONTACTS = '/delete-contacts';

// Message Endpoint
const GET_MESSAGE = '/get-message';
const SEND_MESSAGE = '/send-message';

// Employee Endpoint
const CREATE_EMPLOYEE = '/create-employee';
const GET_EMPLOYEE = '/get-employee';
const GET_EMPLOYEES = '/get-employees';
const UPDATE_EMPLOYEE = '/update-employee';
const UPDATE_EMPLOYEE_ROLE = '/update-employee-role';
const GET_EMPLOYESS_BY_GROUP = '/all/:groupId';
const UPDATE_EMPLOYEE_DEPARTMENT = '/update-employee-department';

// Role Endpoint
const CREATE_ROLE = '/create-role';
const GET_ROLE = '/get-role';
const DELETE_ROLE = '/delete-role';
const UPDATE_ROLE = '/update-role';

const GET_ID_PARAM = '/:id';
const BASE_SUB = '/';
// Admin
const DELETE_MULTIPLE_ADMINS = '/delete-admins';
const DELETE_MULTIPLE_GROUPS = '/delete-groups';
const DELETE_MULTIPLE_EMOLOYEES = '/delete-employees';
const DELETE_MULTIPLE_MESSAGES = '/delete-messages';
const DELETE_MULTIPLE_ROLES = '/delete-roles';
const DELETE_MULTIPLE_SENDERS_ID = '/delete-senderIds';

// Report
const CREATE_REPORT = '/create-report';
const GET_REPORT = '/get-report';
const DELETE_REPORT = '/delete-report';
const DELETE_MULTIPLE_REPORTS = '/delete-reports';

// resset password
const SEND_RESSET_PASSWORD_LINK = '/send-reset-password-link';
const SEND_RESSET_PASSWORD_SMS = '/send-reset-password-sms';
const RESSET_PASSWORD = '/reset-password';

// Application
const APPLICATION_INFO = '/platform-info';

export default {
  SETTINGS,
  APPLICATION_INFO,
  SEND_MESSAGE,
  GET_EMPLOYESS_BY_GROUP,
  GET_EMPLOYEES,
  PROFILE,
  GET_PROFILE,
  LOGIN,
  SIGNUP,
  TOKEN_MANAGEMENT,
  VERIFICATION,
  VERIFICATION_CALL,
  VERIFICATION_CODE,
  VERIFICATION_SMS,

  SEND_RESSET_PASSWORD_LINK,
  SEND_RESSET_PASSWORD_SMS,
  VERIFIFY_CODE,
  RESSET_PASSWORD,

  GET_ID_PARAM,
  BASE_SUB,
  UPDATE_ROLE,
  CREATE_DEPARTMENT,
  GET_DEPARTMENT,
  UPDATE_DEPARTMENT,
  ADD_CREDIT,
  GET_CONTACT,
  GET_MESSAGE,
  CREATE_EMPLOYEE,
  GET_EMPLOYEE,
  UPDATE_EMPLOYEE,
  UPDATE_EMPLOYEE_ROLE,
  UPDATE_EMPLOYEE_DEPARTMENT,
  CREATE_ROLE,
  GET_ROLE,
  DELETE_ROLE,

  DELETE_MULTIPLE_CONTACTS,
  DELETE_MULTIPLE_EMOLOYEES,
  DELETE_MULTIPLE_ADMINS,
  DELETE_MULTIPLE_GROUPS,
  DELETE_MULTIPLE_MESSAGES,
  DELETE_MULTIPLE_ROLES,
  DELETE_MULTIPLE_SENDERS_ID,
  DELETE_MULTIPLE_REPORTS,

  GET_REPORT,
  CREATE_REPORT,
  DELETE_REPORT,

  ACTIVITIES,
};
