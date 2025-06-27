import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';
import { SET_COUNT } from 'actions/experiences';

export type ExperienceCountBox = FetchBox<number>;

const preloadedState: {
  countBox: ExperienceCountBox;
} = {
  countBox: getUnfetched(),
};

export default createReducer(preloadedState, {
  [SET_COUNT]: (state, { countBox }: { countBox: ExperienceCountBox }) => ({
    ...state,
    countBox,
  }),
});
