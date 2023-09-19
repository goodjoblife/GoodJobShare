import createReducer from 'utils/createReducer';
import { SET_STATUS } from 'actions/jobTitle';

const preloadedState = {};

const reducer = createReducer(preloadedState, {
  [SET_STATUS]: (state, { jobTitle, status, data, error }) => ({
    ...state,
    [jobTitle]: {
      status,
      data,
      error,
    },
  }),
});

export default reducer;
