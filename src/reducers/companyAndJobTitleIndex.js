import createReducer from 'utils/createReducer';
import { SET_STATUS } from '../actions/companyAndJobTitleIndex';

const preloadedState = {};

const reducer = createReducer(preloadedState, {
  [SET_STATUS]: (state, { pageType, status, data, error }) => ({
    ...state,
    [pageType]: {
      status,
      data,
      error,
    },
  }),
});

export default reducer;
