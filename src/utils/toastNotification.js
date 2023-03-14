import { defaultTo } from 'ramda';
import { randomUUID } from 'crypto';

import { NOTIFICATION_TYPE } from 'constants/toastNotification';

const defaultToInfo = defaultTo(NOTIFICATION_TYPE.INFO);

export const generateNotification = (type, content) => {
  const id = randomUUID();

  const notificationType = defaultToInfo(NOTIFICATION_TYPE[type]);

  return {
    id,
    type: notificationType,
    content,
  };
};
