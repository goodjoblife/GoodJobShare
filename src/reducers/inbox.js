import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';
import { SET_INBOX, SET_INBOX_COUNT } from 'actions/inbox';

const preloadedState = {
  unreadCount: 0,
  messages: getUnfetched(),
};

const inbox = createReducer(preloadedState, {
  [SET_INBOX_COUNT]: (state, { count }) => ({
    ...state,
    unreadCount: count,
  }),
  [SET_INBOX]: (state, { box }) => ({
    ...state,
    messages: box,
  }),
});

export default inbox;
