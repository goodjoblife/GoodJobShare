import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';
import { SET_COUNT } from 'actions/experiences';

const preloadedState = {
  countBox: getUnfetched(),
};

export default createReducer(preloadedState, {
  [SET_COUNT]: (state, { countBox }) => ({
    ...state,
    countBox,
  }),
});
