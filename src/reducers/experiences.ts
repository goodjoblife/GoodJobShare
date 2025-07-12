import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';
import { SET_COUNT } from 'actions/experiences';

const preloadedState: {
  countBox: FetchBox<number>;
} = {
  countBox: getUnfetched(),
};

export default createReducer(preloadedState, {
  [SET_COUNT]: (state, { countBox }: { countBox: FetchBox<number> }) => ({
    ...state,
    countBox,
  }),
});
