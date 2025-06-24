import { compose } from 'ramda';

export const messagesSelector = state => state.inbox.messages.data || [];

export const unreadCountSelector = compose(
  messages => messages.filter(message => !message.read).length,
  messagesSelector,
);
