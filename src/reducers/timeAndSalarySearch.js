import createReducer from 'utils/createReducer';

import {
  SET_SEARCH_DATA,
  SET_SEARCH_STATUS,
} from 'actions/timeAndSalarySearch';
import fetchingStatus from 'constants/status';

const preloadedState = {
  keyword: null,
  data: [],
  status: fetchingStatus.UNFETCHED,
  error: null,
};

export default createReducer(preloadedState, {
  [SET_SEARCH_DATA]: (state, { keyword, data, status, error }) => ({
    ...state,
    data,
    status,
    error,
    keyword,
  }),
  [SET_SEARCH_STATUS]: (state, { status }) => ({
    ...state,
    status,
  }),
});
