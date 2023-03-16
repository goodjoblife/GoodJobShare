import { propEq, reject } from 'ramda';

import createReducer from 'utils/createReducer';
import { generateNotification } from 'utils/toastNotification';
import { NOTIFICATION_TYPE } from 'constants/toastNotification';

import { PUSH, REMOVE } from '../actions/toastNotification';

const preloadedState = {
  notifications: [
    generateNotification(
      NOTIFICATION_TYPE.INFO,
      'this is notification 1 and it should be too long',
    ),
    generateNotification(NOTIFICATION_TYPE.WARNING, 'this is a notification 2'),
    generateNotification(NOTIFICATION_TYPE.ALERT, 'this is a notification 3'),
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
  [REMOVE]: (state, { id }) => {
    const removeFunc = reject(propEq('id', id));
    return {
      ...state,
      notifications: removeFunc(state.notifications),
    };
  },
});
