import { compose, when, always } from 'ramda';

// keyword from ?q=xxx
export const keywordFromQuerySelector = compose(
  when(keyword => typeof keyword !== 'string', always('')),
  query => query.q,
);
