import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';
import { SET_INDEX_COUNT, SET_INDEX, SET_OVERVIEW } from 'actions/company';

const preloadedState = {
  // page --> indexBox
  indexesByPage: {},
  indexCountBox: getUnfetched(),
  // companyName --> overviewBox
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
  [SET_OVERVIEW]: (state, { companyName, box }) => {
    return {
      ...state,
      overviewByName: {
        ...state.overviewByName,
        [companyName]: box,
      },
    };
  },
});

export default reducer;
