import { defaultTo } from 'ramda';

import { NOTIFICATION_TYPE } from 'constants/toastNotification';

const defaultToInfo = defaultTo(NOTIFICATION_TYPE.INFO);

export const generateNotification = (content, type) => {
  const id = crypto.randomUUID();

  const notificationType = defaultToInfo(NOTIFICATION_TYPE[type]);

  return {
    id: id,
    type: notificationType,
    content,
  };
};
