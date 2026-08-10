import { SET_SEARCH_BY_KEYWORD } from 'actions/search';
import createReducer from 'utils/createReducer';

const preloadedState = {
  // keyword -> box
  byKeyword: {},
};

export default createReducer(preloadedState, {
  [SET_SEARCH_BY_KEYWORD]: (state, { keyword, box }) => ({
    ...state,
    byKeyword: {
      ...state.byKeyword,
      [keyword]: box,
    },
  }),
});
