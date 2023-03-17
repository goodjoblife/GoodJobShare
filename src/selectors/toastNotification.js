import { path } from 'ramda';

export const notificationsSelector = path([
  'toastNotification',
  'notifications',
]);
