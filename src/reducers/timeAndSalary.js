import createReducer from 'utils/createReducer';

import { SET_SALARY_WORK_TIME_COUNT } from 'actions/timeAndSalary';
import fetchingStatus from 'constants/status';

const preloadedState = {
  count: 0,
  countStatus: fetchingStatus.UNFETCHED,
  countError: null,
};

export default createReducer(preloadedState, {
  [SET_SALARY_WORK_TIME_COUNT]: (state, { count, status, error }) => ({
    ...state,
    count,
    countStatus: status,
    countError: error,
  }),
});
