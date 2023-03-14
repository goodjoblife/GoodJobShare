import createReducer from 'utils/createReducer';
import { generateNotification } from 'utils/toastNotification';
import { NOTIFICATION_TYPE } from 'constants/toastNotification';

import { PUSH } from '../actions/toastNotification';

const preloadedState = {
  notifications: [
    generateNotification(NOTIFICATION_TYPE.INFO, 'this is notification 1'),
    generateNotification(NOTIFICATION_TYPE.WARNING, 'this is a notification 2'),
    generateNotification(NOTIFICATION_TYPE.INFO, 'this is a notification 3'),
  ],
};

// enum NotificationType {
//   INFO,
//   WARNING,
//   ALERT,
// }
//
// type Notification = {
//   id: string,
//   type: NotificationType,
//   content: string
// }

export default createReducer(preloadedState, {
  [PUSH]: (state, { notification }) => {
    return {
      ...state,
      notifications: [notification, ...state.notifications],
    };
  },
});
