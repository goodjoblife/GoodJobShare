import PropTypes from 'prop-types';
import { compose, prop } from 'ramda';
import FetchStatus, {
  isUnfetched as constIsUnfetched,
  isFetching as constIsFetching,
} from 'constants/status';

interface FetchBox<T> {
  data?: T;
  status: FetchStatus;
  error?: unknown;
}

export default FetchBox;

// deprecated
export const fetchBoxPropType = PropTypes.shape({
  data: PropTypes.any,
  error: PropTypes.any,
  status: PropTypes.oneOf(Object.values(FetchStatus)),
});

const getStatus = prop('status');

interface FetchBoxWithError<T> extends FetchBox<T> {
  error: unknown;
  status: FetchStatus.ERROR;
}

export const isError = <T>(box: FetchBox<T>): box is FetchBoxWithError<T> =>
  box.status === FetchStatus.ERROR;

export const isUnfetched = compose(
  constIsUnfetched,
  getStatus,
);

interface FetchBoxWithData<T> extends FetchBox<T> {
  data: T;
  status: FetchStatus.FETCHED;
}

export const isFetched = <T>(box: FetchBox<T>): box is FetchBoxWithData<T> =>
  box.status === FetchStatus.FETCHED;

export const isFetching = compose(
  constIsFetching,
  getStatus,
);

// the FetchBox is always immutable

export const getUnfetched = <T>(): FetchBox<T> => {
  return { status: FetchStatus.UNFETCHED };
};

export const getError = <T>(error: unknown): FetchBoxWithError<T> => {
  return { status: FetchStatus.ERROR, error };
};

export const getFetched = <T>(data: T): FetchBoxWithData<T> => {
  return { status: FetchStatus.FETCHED, data };
};

export const toFetching = <T>(
  fetchBox: FetchBox<T> | undefined = undefined,
): FetchBox<T> => {
  const { data } = fetchBox || {};

  return { status: FetchStatus.FETCHING, data };
};
