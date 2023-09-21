import createReducer from 'utils/createReducer';
import { SET_COUNT_DATA } from 'actions/experiences';
import fetchingStatus from 'constants/status';

const preloadedState = {
  count: 0,
  countStatus: fetchingStatus.UNFETCHED,
  countError: null,
};

export default createReducer(preloadedState, {
  [SET_COUNT_DATA]: (state, { count, status, error }) => ({
    count,
    countStatus: status,
    countError: error,
  }),
});
