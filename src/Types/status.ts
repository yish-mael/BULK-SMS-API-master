type statusProps = {
  CODE: number;
  STATUS_TEXT: string;
  DESCRIPTION: string;
};

type STATUS_TYPES = {
  OK: statusProps;

  CREATED: statusProps;

  BAD_REQUEST: statusProps;

  UNAUTHORIZED: statusProps;

  FORBIDDEN: statusProps;

  NOT_FOUND: statusProps;

  METHOD_NOT_ALLOWED: statusProps;

  CONFLICT: statusProps;

  LENGTH_REQUIRED: statusProps;

  PRECONDITION_FAILED: statusProps;

  TOO_MANY_REQURES: statusProps;

  INTERNAL_SERVER_ERROR: statusProps;

  SERVICE_UNAVAILABLE: statusProps;

  INVALID_ACCOUNT: statusProps;
};

export default STATUS_TYPES;
