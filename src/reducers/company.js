import createReducer from 'utils/createReducer';
import { SET_STATUS } from '../actions/company';

const preloadedState = {};

const reducer = createReducer(preloadedState, {
  [SET_STATUS]: (state, { companyName, status, data, error }) => ({
    ...state,
    [companyName]: {
      status,
      data,
      error,
    },
  }),
});

export default reducer;
