import rollbar from 'utils/rollbar';
import { NOTIFICATION_TYPE } from 'constants/toastNotification';
import { ERROR_CODE_MSG } from 'constants/errorCodeMsg';
import { generateNotification } from 'utils/toastNotification';

export const PUSH = '@@TOAST_NOTIFICATION/PUSH';
export const REMOVE = '@@TOAST_NOTIFICATION/REMOVE';

export const pushNotification = (type, content) => {
  const notification = generateNotification(type, content);

  return {
    type: PUSH,
    notification,
  };
};

export const removeNotification = id => ({
  type: REMOVE,
  id,
});

const composeErrorMessage = (code, message, error) => {
  if (error) {
    return `[${code}] ${message}: ${error}`;
  } else {
    return `[${code}] ${message}`;
  }
};

const pushErrorNotification = (code, message) =>
  pushNotification(NOTIFICATION_TYPE.ALERT, composeErrorMessage(code, message));

export const pushErrorNotificationAndRollbar = (errorCode, error, extra) => (
  dispatch,
  getState,
) => {
  dispatch(
    pushErrorNotification(errorCode, ERROR_CODE_MSG[errorCode].external),
  );
  const internalMessage = composeErrorMessage(
    errorCode,
    ERROR_CODE_MSG[errorCode].internal,
    error,
  );
  if (!extra) {
    rollbar.error(internalMessage);
  } else {
    rollbar.error(internalMessage, extra);
  }
};

export const pushErrorNotificationAndRollbarAndThrowError = (
  errorCode,
  error,
  extra,
) => (dispatch, getState) => {
  dispatch(pushErrorNotificationAndRollbar(errorCode, error, extra));

  const internalMessage = composeErrorMessage(
    errorCode,
    ERROR_CODE_MSG[errorCode].internal,
    error,
  );
  throw new Error(internalMessage);
};
