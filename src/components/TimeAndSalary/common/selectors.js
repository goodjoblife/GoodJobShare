import { compose } from 'ramda';
import { querySelector } from 'common/routing/selectors';

// TODO: 可以重新改寫這個 query

export const keywordFromQuerySelector = query => query.q;
export const pageFromQuerySelector = query => query.p;

export const searchKeywordSelector = compose(
  keywordFromQuerySelector,
  querySelector,
);

export const pageSelector = compose(
  pageFromQuerySelector,
  querySelector,
);
