import fetchUtil from '../utils/fetchUtil';
import status from '../constants/status';

export const SET_SORT = 'SET_TSET_SORTYPE';
export const SET_SEARCH_TYPE = 'SET_SEARCH_TYPE';
export const SET_INDUSTRY = 'SET_INDUSTRY';
export const SET_SEARCH_BY = 'SET_SEARCH_BY';
export const SET_EXPERIENCES = 'SET_EXPERIENCES';
export const SET_WORKINGS = 'SET_WORKINGS';
export const SET_KEYWORD = 'SET_KEYWORD';
export const SET_KEYWORDS = 'SET_KEYWORDS';
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
export const SET_SORT_AND_EXPERIENCES = 'SET_SORT_AND_EXPERIENCES';
export const SET_SEARCH_QUERY_AND_EXPERIENCES = 'SET_SEARCH_QUERY_AND_EXPERIENCES';
export const SET_KEYWORDS_AND_EXPERIENCES = 'SET_KEYWORDS_AND_EXPERIENCES';

export const setSort = e => ({
  type: SET_SORT,
  sort: e.target.value,
});

export const setSearchType = e => ({
  type: SET_SEARCH_TYPE,
  searchType: e.target.value,
});

export const setIndustry = e => ({
  type: SET_INDUSTRY,
  industry: e.target.value,
});

export const setSearchBy = e => ({
  type: SET_SEARCH_BY,
  searchBy: e.target.value,
});

export const setKeyword = e => ({
  type: SET_KEYWORD,
  keyword: e.target.value,
});

export const fetchExperiences = (cond, val) => (dispatch, getState) => {
  const data = getState().experienceSearch.toJS();
  const sort = val || data.sort;
  let url = '/experiences';
  let objCond;

  dispatch({
    type: SET_LOADING_STATUS,
    loadingStatus: status.FETCHING,
  });

  if (cond === 'searchBy') {
    url = `${url}?search_by=${data.searchBy}&search_query=${val}`;

    objCond = {
      type: SET_SEARCH_QUERY_AND_EXPERIENCES,
      keyword: val,
      searchQuery: val,
    };
  } else { // cond === 'sort'
    url = `${url}?sort=${sort}`;

    objCond = {
      type: SET_SORT_AND_EXPERIENCES,
      sort,
      keyword: '',
      searchQuery: '',
      workings: '',
      salary: false,
    };
  }
  return fetchUtil(url)('GET')
    .then(result => {
      dispatch(Object.assign(objCond, {
        loadingStatus: status.FETCHED,
        error: null,
        experiences: result.experiences,
        experienceCount: result.total,
      }));
    })
    .catch(error => {
      dispatch(Object.assign(objCond, {
        loadingStatus: status.ERROR,
        error,
        salary: false,
        experiences: [],
        experienceCount: 0,
      }));
    });
};

export const fetchWorkings = val => (dispatch, getState) => {
  const data = getState().experienceSearch.toJS();
  const url = `/workings/search_by/${data.searchBy}/group_by/company?${data.searchBy}=${val}`;

  return fetchUtil(url)('GET')
    .then(result => {
      dispatch({
        type: SET_WORKINGS,
        workings: result,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_WORKINGS,
        workings: [],
      });
    });
};

export const fetchKeywords = e => (dispatch, getState) => {
  const data = getState().experienceSearch.toJS();
  const val = e ? e.target.value : data.searchBy;
  const url = val === 'company' ? '/company_keywords' : '/job_title_keywords';
  return fetchUtil(url)('GET')
    .then(result => {
      dispatch({
        type: SET_KEYWORDS,
        searchBy: val,
        keywords: result.keywords,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_KEYWORDS,
        searchBy: val,
        keywords: [],
      });
    });
};

/*
export const fetchKeywordMock = e => (dispatch, getState) => {
  const data = getState().experienceSearch.toJS();
  const val = e ? e.target.value : data.searchBy;
  dispatch({
    type: SET_KEYWORDS,
    searchBy: val,
    keywords: val === 'company' ? ['GoodJob', 'Yahoo', 'MTK'] : ['程序猿', '攻城獅', '猴子'],
  });
  return Promise.resolve();
};
*/
