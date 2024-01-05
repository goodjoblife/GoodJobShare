import createReducer from 'utils/createReducer';

import {
  SET_BOARD_DATA,
  SET_BOARD_STATUS,
} from 'actions/campaignTimeAndSalaryBoard';
import fetchingStatus from 'constants/status';

const preloadedState = {
  campaignName: '',
  sortBy: null,
  order: null,
  data: [],
  total: 0,
  currentPage: 0,
  status: fetchingStatus.UNFETCHED,
  error: null,
};

export default createReducer(preloadedState, {
  [SET_BOARD_DATA]: (
    state,
    { campaignName, sortBy, order, data, total, currentPage, status, error },
  ) => ({
    ...state,
    campaignName,
    data,
    total,
    currentPage,
    status,
    error,
    sortBy,
    order,
  }),
  [SET_BOARD_STATUS]: (state, { status }) => ({
    ...state,
    status,
  }),
});
