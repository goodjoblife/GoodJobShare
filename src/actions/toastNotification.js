import { generateNotification } from 'utils/toastNotification';

export const PUSH = '@@TOAST_NOTIFICATION/PUSH';

export const pushNotification = ({ type, content }) => {
  const notification = generateNotification(type, content);

  return {
    type: PUSH,
    notification,
  };
};
