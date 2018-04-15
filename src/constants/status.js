import R from 'ramda';

const status = {
  UNFETCHED: 'UNFETCHED',
  FETCHED: 'FETCHED',
  FETCHING: 'FETCHING',
  ERROR: 'ERROR',
};

export default status;

export const isUnfetched = R.equals(status.UNFETCHED);
export const isFetched = R.equals(status.FETCHED);
export const isFetching = R.equals(status.FETCHING);
export const isError = R.equals(status.ERROR);
