import createReducer from 'utils/createReducer';
import statusConstant from 'constants/status';
import {
  SET_KEYWORDS,
  SET_SORT_AND_EXPERIENCES,
  SET_LOADING_STATUS,
} from 'actions/experienceSearch';

const preloadedState = {
  sort: 'created_at',
  searchType: ['interview', 'work'], // 過濾 面試、工作經驗 --> 正確是 type
  searchBy: 'job_title', // 搜尋類別（公司、職稱）
  searchQuery: '', // 搜尋類別的關鍵字
  currentPage: 1,

  experiences: [],
  experienceCount: 0,

  keywords: [],
  loadingStatus: statusConstant.UNFETCHED,
  error: null,
};

const experienceSearch = createReducer(preloadedState, {
  [SET_KEYWORDS]: (state, action) => ({
    ...state,
    keywords: action.keywords,
  }),
  [SET_SORT_AND_EXPERIENCES]: (state, action) => ({
    ...state,
    sort: action.payload.sort,
    keyword: action.payload.searchQuery,
    searchQuery: action.payload.searchQuery,
    salary: action.payload.salary,
    experienceCount: action.payload.experienceCount,
    experiences: action.payload.experiences || [],
    currentPage: action.payload.currentPage,
    searchType: action.payload.searchType,
    searchBy: action.payload.searchBy,
  }),
  [SET_LOADING_STATUS]: (state, { payload: { status, error } }) => ({
    ...state,
    loadingStatus: status,
    error,
  }),
});

export default experienceSearch;
