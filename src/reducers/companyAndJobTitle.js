import createReducer from 'utils/createReducer';
import STATUS from '../constants/status';
import { SET_STATUS, SET_DATA } from '../actions/companyAndJobTitle';

const preloadedState = {
  pageType: null,
  pageName: null,
  status: STATUS.UNFETCHED,
  error: null,
  data: null,
};

const reducer = createReducer(preloadedState, {
  [SET_STATUS]: (state, { pageType, pageName, status, error }) => ({
    ...state,
    pageType,
    pageName,
    status,
    error,
  }),
  [SET_DATA]: (state, { data }) => ({
    ...state,
    data,
  }),
});

export default reducer;
