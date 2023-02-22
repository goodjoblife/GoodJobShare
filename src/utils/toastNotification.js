import { isNil } from 'ramda';

import { NOTIFICATION_TYPE } from 'constants/toastNotification';

export const generateNotification = (content, type) => {
  const id = crypto.randomUUID();

  const notificationType = isNil(NOTIFICATION_TYPE[type])
    ? NOTIFICATION_TYPE.INFO
    : NOTIFICATION_TYPE.INFO;

  return {
    id: id,
    type: notificationType,
    content,
  };
};
