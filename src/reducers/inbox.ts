import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';
import { SET_INBOX, SET_INBOX_COUNT } from 'actions/inbox';
import {
  InboxMessage,
  SetInboxAction,
  SetInboxCountAction,
} from 'actions/inbox';

interface InboxState {
  unreadCount: number;
  messages: FetchBox<InboxMessage[]>;
}

const preloadedState: InboxState = {
  unreadCount: 0,
  messages: getUnfetched(),
};

const inbox = createReducer<
  InboxState,
  {
    [SET_INBOX_COUNT]: SetInboxCountAction;
    [SET_INBOX]: SetInboxAction;
  }
>(preloadedState, {
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
