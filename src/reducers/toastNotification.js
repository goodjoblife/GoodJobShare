import { propEq, reject } from 'ramda';

import createReducer from 'utils/createReducer';

import { PUSH, REMOVE } from '../actions/toastNotification';

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
