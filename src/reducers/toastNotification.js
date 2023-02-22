import createReducer from 'utils/createReducer';

import { PUSH } from '../actions/toastNotification';

const preloadedState = { notificationIds: [], notificationMap: {} };

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
    const { id } = notification;

    return {
      ...state,
      notificationIds: [id, ...state.notificationIds],
      notificationMap: { ...state.notificationMap, [id]: notification },
    };
  },
});
