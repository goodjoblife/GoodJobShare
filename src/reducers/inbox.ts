import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';
import { SET_INBOX, SET_INBOX_COUNT } from 'actions/inbox';

interface InboxMessage {
  id: string;
  title: string;
  link: string;
  date: Date;
  read: boolean;
}

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
    [SET_INBOX_COUNT]: { type: typeof SET_INBOX_COUNT; count: number };
    [SET_INBOX]: { type: typeof SET_INBOX; box: FetchBox<InboxMessage[]> };
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
