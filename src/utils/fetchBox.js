import PropTypes from 'prop-types';
import { compose, prop } from 'ramda';

import fetchingStatus, {
  isError as constIsError,
  isFetched as constIsFetched,
  isUnfetched as constIsUnfetched,
  isFetching as constIsFetching,
} from 'constants/status';

// please don't make it public; it should be a naive data type generator
const initFetchBox = (
  data = null,
  status = fetchingStatus.UNFETCHED,
  error = null,
) => ({
  data,
  status,
  error,
});

export const fetchBoxPropType = PropTypes.shape({
  data: PropTypes.any,
  error: PropTypes.any,
  status: PropTypes.oneOf(Object.values(fetchingStatus)),
});

const getStatus = prop('status');

export const isError = compose(
  constIsError,
  getStatus,
);

export const isUnfetched = compose(
  constIsUnfetched,
  getStatus,
);

export const isFetched = compose(
  constIsFetched,
  getStatus,
);

export const isFetching = compose(
  constIsFetching,
  getStatus,
);

// the FetchBox is always immutable

export const getUnfetched = () => {
  return initFetchBox();
};

export const getError = error => {
  return initFetchBox(null, fetchingStatus.ERROR, error);
};

export const getFetched = data => {
  return initFetchBox(data, fetchingStatus.FETCHED);
};

export const toFetching = fetchBox => {
  const { data } = fetchBox || {};

  return initFetchBox(data, fetchingStatus.FETCHING);
};

export const mapBoxData = (fetchBox, fn) => ({
  ...fetchBox,
  data: fn(fetchBox.data),
});
