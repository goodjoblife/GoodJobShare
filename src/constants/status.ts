import R from 'ramda';

enum FetchStatus {
  UNFETCHED = 'UNFETCHED',
  FETCHED = 'FETCHED',
  FETCHING = 'FETCHING',
  ERROR = 'ERROR',
}

export default FetchStatus;

export const isUnfetched = R.equals(FetchStatus.UNFETCHED);
export const isFetched = R.equals(FetchStatus.FETCHED);
export const isFetching = R.equals(FetchStatus.FETCHING);
export const isError = R.equals(FetchStatus.ERROR);
