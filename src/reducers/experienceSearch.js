import { Map, fromJS } from 'immutable';

import createReducer from 'utils/createReducer';
import statusConstant from '../constants/status';
import {
  SET_SEARCH_BY,
  SET_EXPERIENCES,
  SET_WORKINGS,
  SET_KEYWORD,
  SET_KEYWORDS,
  SET_KEYWORDS_AND_EXPERIENCES,
  SET_SORT_AND_EXPERIENCES,
  SET_CURRENT_PAGE,
  SET_LOADING_STATUS,
} from '../actions/experienceSearch';

const preloadedState = Map({
  sort: 'created_at',
  searchType: ['interview', 'work'], // 過濾 面試、工作經驗 --> 正確是 type
  searchBy: 'job_title', // 搜尋類別（公司、職稱）
  searchQuery: '', // 搜尋類別的關鍵字
  currentPage: 1,

  experiences: [],
  experienceCount: 0,

  industry: 'all',
  keyword: '', // input value 用
  keywords: [],
  prevCond: 'sort',
  preValue: '',
  hasMore: false,
  workings: [],
  loadingStatus: statusConstant.UNFETCHED,
  error: null,
});

const experienceSearch = createReducer(preloadedState, {
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
      currentPage: action.payload.currentPage,
      searchType: action.payload.searchType,
      searchBy: action.payload.searchBy,
    }),

  [SET_KEYWORDS_AND_EXPERIENCES]: (state, action) =>
    state.merge({
      keyword: fromJS(action.keywords || []),
      experienceCount: action.experienceCount,
      experiences: fromJS(action.experiences || []),
    }),

  [SET_CURRENT_PAGE]: (state, action) =>
    state.merge({
      currentPage: action.payload.currentPage,
    }),

  [SET_LOADING_STATUS]: (state, { payload: { status, error } }) =>
    state.merge({
      loadingStatus: status,
      error,
    }),
});

export default experienceSearch;
