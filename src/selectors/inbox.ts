import { compose } from 'ramda';
import { RootState } from 'reducers';
import FetchBox from 'utils/fetchBox';
import { InboxMessage } from 'constants/inbox';

export const messagesBoxSelector = (
  state: RootState,
): FetchBox<InboxMessage[]> => state.inbox.messages;

export const messagesSelector = compose(
  (box: FetchBox<InboxMessage[]>) => box.data || [],
  messagesBoxSelector,
);

export const unreadCountSelector = (state: RootState): number =>
  state.inbox.unreadCount;
