import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';
import { SET_COUNT } from 'actions/experiences';

export type SalaryWorkTimeCountBox = FetchBox<number>;

const preloadedState: {
  countBox: SalaryWorkTimeCountBox;
} = {
  countBox: getUnfetched(),
};

export default createReducer(preloadedState, {
  [SET_COUNT]: (state, { countBox }: { countBox: SalaryWorkTimeCountBox }) => ({
    ...state,
    countBox,
  }),
});
