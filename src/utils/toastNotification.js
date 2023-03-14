import { defaultTo } from 'ramda';

import { NOTIFICATION_TYPE } from 'constants/toastNotification';

const defaultToInfo = defaultTo(NOTIFICATION_TYPE.INFO);

const generateRandomString = () => {
  return Math.floor(Math.random() * Date.now()).toString(36);
};

export const generateNotification = (type, content) => {
  const id = generateRandomString();

  const notificationType = defaultToInfo(NOTIFICATION_TYPE[type]);

  return {
    id,
    type: notificationType,
    content,
  };
};
