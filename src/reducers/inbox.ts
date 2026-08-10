import {
  SET_INBOX,
  SET_INBOX_COUNT,
  SetInboxAction,
  SetInboxCountAction,
} from 'actions/inbox';
import { InboxMessage } from 'constants/inbox';
import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';

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
