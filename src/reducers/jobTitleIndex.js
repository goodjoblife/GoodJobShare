import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';
import { SET_INDEX_COUNT, SET_INDEX, SET_OVERVIEW } from 'actions/jobTitle';

const preloadedState = {
  // page --> indexBox
  indexesByPage: {},
  indexCountBox: getUnfetched(),
  // jobTitle --> overviewBox
  overviewByName: {},
};

const reducer = createReducer(preloadedState, {
  [SET_INDEX_COUNT]: (state, { box }) => ({
    ...state,
    indexCountBox: box,
  }),
  [SET_INDEX]: (state, { page, box }) => {
    return {
      ...state,
      indexesByPage: {
        ...state.indexesByPage,
        [page]: box,
      },
    };
  },
  [SET_OVERVIEW]: (state, { jobTitle, box }) => {
    return {
      ...state,
      overviewByName: {
        ...state.overviewByName,
        [jobTitle]: box,
      },
    };
  },
});

export default reducer;
