import { Map, fromJS } from 'immutable';

import createReducer from 'utils/createReducer';
import status from '../constants/status';
import {
  SET_SORT,
  SET_SEARCH_TYPE,
  SET_INDUSTRY,
  SET_SEARCH_BY,
  SET_EXPERIENCES,
  SET_WORKINGS,
  SET_KEYWORD,
  SET_KEYWORDS,
  SET_LOADING_STATUS,
  SET_SEARCH_QUERY_AND_EXPERIENCES,
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
  [SET_SORT]: (state, action) => state.update('sort', () => action.sort),

  [SET_SEARCH_TYPE]: (state, action) =>
    state.update(action.searchType, v => !v),

  [SET_INDUSTRY]: (state, action) =>
    state.update('industry', () => action.industry),

  [SET_SEARCH_BY]: (state, action) =>
    state.update('searchBy', () => action.searchBy),

  [SET_KEYWORD]: (state, action) =>
    state.update('keyword', () => action.keyword),

  [SET_LOADING_STATUS]: (state, action) =>
    state.merge({
      loadingStatus: action.loadingStatus,
      prevCond: action.prevCond,
      prevValue: action.prevValue,
      // prevPage: action.prevPage,
    }),

  [SET_EXPERIENCES]: (state, action) =>
    state.merge({
      experiences: fromJS(action.experiences || []),
      experienceCount: action.experienceCount,
    }),

  [SET_WORKINGS]: (state, action) =>
    state.update('workings', () => fromJS(action.workings || [])),

  [SET_KEYWORDS]: (state, action) =>
    state.merge({
      searchBy: action.searchBy,
      keywords: fromJS(action.keywords || []),
    }),

  [SET_SORT_AND_EXPERIENCES]: (state, action) =>
    state.merge({
      loadingStatus: action.loadingStatus,
      error: action.error,
      sort: action.sort,
      keyword: action.searchQuery,
      searchQuery: action.searchQuery,
      workings: action.workings,
      salary: action.salary,
      experienceCount: action.experienceCount,
      experiences: fromJS(action.experiences || []),
      hasMore: action.hasMore,
      prevCond: action.prevCond,
      prevValue: action.prevValue,
      // prevPage: action.prevPage,
    }),

  [SET_SEARCH_QUERY_AND_EXPERIENCES]: (state, action) =>
    state.merge({
      loadingStatus: action.loadingStatus,
      error: action.error,
      keyword: action.searchQuery,
      searchQuery: action.searchQuery,
      experienceCount: action.experienceCount,
      experiences: fromJS(action.experiences || []),
      hasMore: action.hasMore,
      prevCond: action.prevCond,
      prevValue: action.prevValue,
      // prevPage: action.prevPage,
    }),

  [SET_KEYWORDS_AND_EXPERIENCES]: (state, action) =>
    state.merge({
      keyword: fromJS(action.keywords || []),
      experienceCount: action.experienceCount,
      experiences: fromJS(action.experiences || []),
    }),
});

export default experienceSearch;
