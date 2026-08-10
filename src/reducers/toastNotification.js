import { propEq, reject } from 'ramda';

import { PUSH, REMOVE } from 'actions/toastNotification';
import createReducer from 'utils/createReducer';

const preloadedState = {
  notifications: [],
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
