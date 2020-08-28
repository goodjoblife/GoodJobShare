import R from 'ramda';
import STATUS from '../constants/status';

const status = R.compose(
  R.defaultTo(STATUS.UNFETCHED),
  R.prop('status'),
);

const data = state => state.data;

const pageTypeState = pageType =>
  R.compose(
    R.defaultTo({}),
    R.path(['companyAndJobTitleIndex', pageType]),
  );

export const pageTypeStatus = pageType =>
  R.compose(
    status,
    pageTypeState(pageType),
  );

export const pageTypeData = pageType =>
  R.compose(
    data,
    pageTypeState(pageType),
  );
