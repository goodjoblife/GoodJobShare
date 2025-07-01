import createReducer from 'utils/createReducer';
import { SET_SEARCH_BY_KEYWORD } from 'actions/search';

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
