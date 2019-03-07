import { compose } from 'ramda';
import { querySelector } from 'common/routing/selectors';

export const searchKeywordSelector = compose(
  params => params.q,
  querySelector,
);

export const searchCriteriaSelector = compose(
  params => params.s_by,
  querySelector,
);

export const pageSelector = compose(
  params => params.p,
  querySelector,
);
