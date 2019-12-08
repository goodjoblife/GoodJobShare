import createReducer from 'utils/createReducer';

import { SET_STATUS } from '../actions/popularJobTitleSalaryDistribution';
import fetchingStatus from '../constants/status';

const preloadedState = {
  data: [],
  status: fetchingStatus.UNFETCHED,
  error: null,
};

export default createReducer(preloadedState, {
  [SET_STATUS]: (state, { status, data, error }) => ({
    status,
    data,
    error,
  }),
});
