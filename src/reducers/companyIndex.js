import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';
import { SET_INDEX_COUNT, SET_INDEX } from 'actions/company';

const preloadedState = {
  // page --> indexBox
  indexes: {},
  indexCountBox: getUnfetched(),
};

const reducer = createReducer(preloadedState, {
  [SET_INDEX_COUNT]: (state, { box }) => ({
    ...state,
    indexCountBox: box,
  }),
  [SET_INDEX]: (state, { page, box }) => {
    return {
      ...state,
      indexes: {
        ...state.indexes,
        [page]: box,
      },
    };
  },
});

export default reducer;
