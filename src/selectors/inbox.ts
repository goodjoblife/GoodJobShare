import { compose } from 'ramda';

import { InboxMessage } from 'constants/inbox';
import { RootState } from 'reducers';
import FetchBox from 'utils/fetchBox';

export const messagesBoxSelector = (
  state: RootState,
): FetchBox<InboxMessage[]> => state.inbox.messages;

export const messagesSelector = compose(
  (box: FetchBox<InboxMessage[]>) => box.data || [],
  messagesBoxSelector,
);

export const unreadCountSelector = (state: RootState): number =>
  state.inbox.unreadCount;
