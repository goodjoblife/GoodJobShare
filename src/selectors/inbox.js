import { compose } from 'ramda';

export const messagesBoxSelector = state => state.inbox.messages;

export const messagesSelector = compose(
  box => box.data || [],
  messagesBoxSelector,
);

export const unreadCountSelector = state => state.inbox.unreadCount;
