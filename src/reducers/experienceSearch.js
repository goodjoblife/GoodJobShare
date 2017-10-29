import { Map, fromJS } from 'immutable';

import createReducer from 'utils/createReducer';
import status from '../constants/status';
import {
  SET_SEARCH_TYPE,
  SET_SEARCH_BY,
  SET_EXPERIENCES,
  SET_WORKINGS,
  SET_KEYWORD,
  SET_KEYWORDS,
  SET_KEYWORDS_AND_EXPERIENCES,
  SET_SORT_AND_EXPERIENCES,
} from '../actions/experienceSearch';

const preloadedState = Map({
  sort: 'created_at',
  interview: true,
  work: true,
  salary: false,
  industry: 'all',
  searchBy: 'job_title',
  searchQuery: '', // query & result 用
  keyword: '', // input value 用
  keywords: [],
  experiences: [],
  experienceCount: 0,
  prevCond: 'sort',
  preValue: '',
  prevPage: 0,
  hasMore: false,
  workings: [],
  loadingStatus: status.UNFETCHED,
  error: null,
});

const experienceSearch = createReducer(preloadedState, {
  [SET_SEARCH_TYPE]: (state, action) =>
    state.update(action.searchType, v => !v),

  [SET_SEARCH_BY]: (state, action) =>
    state.update('searchBy', () => action.searchBy),

  [SET_KEYWORD]: (state, action) =>
    state.update('keyword', () => action.keyword),

  [SET_EXPERIENCES]: (state, action) =>
    state.merge({
      experiences: fromJS(action.experiences || []),
      experienceCount: action.experienceCount,
    }),

  [SET_WORKINGS]: (state, action) =>
    state.update('workings', () => fromJS(action.workings || [])),

  [SET_KEYWORDS]: (state, action) =>
    state.merge({
      keywords: fromJS(action.keywords),
    }),

  [SET_SORT_AND_EXPERIENCES]: (state, action) =>
    state.merge({
      loadingStatus: action.payload.loadingStatus,
      error: action.payload.error,
      sort: action.payload.sort,
      keyword: action.payload.searchQuery,
      searchQuery: action.payload.searchQuery,
      workings: action.payload.workings,
      salary: action.payload.salary,
      experienceCount: action.payload.experienceCount,
      experiences: fromJS(action.payload.experiences || []),
      hasMore: action.payload.hasMore,
      prevCond: action.payload.prevCond,
      prevValue: action.payload.prevValue,
    }),

  [SET_KEYWORDS_AND_EXPERIENCES]: (state, action) =>
    state.merge({
      keyword: fromJS(action.keywords || []),
      experienceCount: action.experienceCount,
      experiences: fromJS(action.experiences || []),
    }),
});

export default experienceSearch;
