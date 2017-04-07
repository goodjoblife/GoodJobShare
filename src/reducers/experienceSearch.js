import { Map } from 'immutable';

import createReducer from 'utils/createReducer';
import { SET_SORT, SET_TYPE, SET_INDUSTRY,
  SET_CONDITION } from '../actions/experienceSearch';

const preloadedState = Map({
  sort: 'created_at',
  interview: false,
  work: false,
  salary: false,
  industry: 'all',
  condition: 'job_title',
});

const experienceSearch = createReducer(preloadedState, {
  [SET_SORT]: (state, action) => state.update('sort', () => action.sort),

  [SET_TYPE]: (state, action) => state.update(action.searchType, v => !v),

  [SET_INDUSTRY]: (state, action) =>
    state.update('industry', () => action.industry),

  [SET_CONDITION]: (state, action) =>
    state.update('condition', () => action.condition),
});

export default experienceSearch;
