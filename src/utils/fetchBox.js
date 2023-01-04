import PropTypes from 'prop-types';

import fetchingStatus from 'constants/status';

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
  status: PropTypes.oneOf(Object.values(fetchingStatus)),
  error: PropTypes.any,
});

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
  const { data } = fetchBox;

  return initFetchBox(data, fetchingStatus.FETCHING);
};
