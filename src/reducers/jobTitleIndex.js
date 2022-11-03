import createReducer from 'utils/createReducer';
import { SET_INDEX_STATUS } from '../actions/jobTitle';

const preloadedState = {};

const reducer = createReducer(preloadedState, {
  [SET_INDEX_STATUS]: (state, { status, data, error }) => ({
    status,
    data,
    error,
  }),
});

export default reducer;
