import createReducer from 'utils/createReducer';
import { SET_STATUS } from '../actions/companyAndJobTitle';

const preloadedState = {};

const reducer = createReducer(preloadedState, {
  [SET_STATUS]: (state, { pageType, pageName, status, data, error }) => ({
    ...state,
    [pageType]: {
      ...state[pageType],
      [pageName]: {
        status,
        data,
        error,
      },
    },
  }),
});

export default reducer;
