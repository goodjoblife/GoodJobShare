import createReducer from 'utils/createReducer';
import STATUS from '../constants/status';
import { SET_STATUS, SET_DATA } from '../actions/companyAndJobTitle';

const preloadedState = {
  status: STATUS.UNFETCHED,
  error: null,
  data: null,
};

const reducer = createReducer(preloadedState, {
  [SET_STATUS]: (state, { status, error }) => ({
    ...state,
    status,
    error,
  }),
  [SET_DATA]: (state, { data }) => ({
    ...state,
    data,
  }),
});

export default reducer;
