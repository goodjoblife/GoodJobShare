import fetchUtil from '../utils/fetchUtil';

export const SET_SORT = 'SET_TSET_SORTYPE';
export const SET_SEARCH_TYPE = 'SET_SEARCH_TYPE';
export const SET_INDUSTRY = 'SET_INDUSTRY';
export const SET_SEARCH_BY = 'SET_SEARCH_BY';
export const SET_EXPERIENCES = 'SET_EXPERIENCES';
export const SET_WORKINGS = 'SET_WORKINGS';
export const SET_KEYWORD = 'SET_KEYWORD';
export const SET_KEYWORDS = 'SET_KEYWORDS';
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
  // dispatch(setMetaListStatus(status.FETCHING));
  const data = getState().experienceSearch.toJS();
  const sort = val || data.sort;
  let url = '/experiences';

  if (cond === 'searchBy') {
    url = `${url}?search_by=${data.searchBy}&search_query=${val}`;
  } else { // cond === 'sort'
    url = `${url}?sort=${sort}`;
  }
  return fetchUtil(url)('GET')
    .then(result => {
      if (cond === 'searchBy') {
        dispatch({
          type: SET_SEARCH_QUERY_AND_EXPERIENCES,
          keyword: val,
          searchQuery: val,
          experiences: result.experiences,
          experienceCount: result.total,
        });
      } else {
        dispatch({
          type: SET_SORT_AND_EXPERIENCES,
          sort,
          keyword: '',
          searchQuery: '',
          workings: '',
          salary: false,
          experiences: result.experiences,
          experienceCount: result.total,
          // error: null,
        });
      }
      // dispatch(setMetaListStatus(status.FETCHED));
    })
    .catch(error => {
      console.error('err', error);
      // dispatch(setMetaListStatus(status.ERROR, err));
      dispatch({
        type: SET_SORT_AND_EXPERIENCES,
        sort,
        keyword: '',
        searchQuery: '',
        experiences: [],
        experienceCount: 0,
        // error,
      });
    });
};

export const fetchWorkings = val => (dispatch, getState) => {
  // dispatch(setMetaListStatus(status.FETCHING));
  const data = getState().experienceSearch.toJS();
  const url = `/workings/search_by/${data.searchBy}/group_by/company?${data.searchBy}=${val}`;

  console.log('data==>', data, data.keyword);

  return fetchUtil(url)('GET')
    .then(result => {
      dispatch({
        type: SET_WORKINGS,
        workings: result,
      });
      // dispatch(setMetaListStatus(status.FETCHED));
    })
    .catch(error => {
      console.error('err', error);
      // dispatch(setMetaListStatus(status.ERROR, err));
      dispatch({
        type: SET_WORKINGS,
        workings: [],
      });
    });
};

export const fetchKeywords2 = e => (dispatch, getState) => {
  // dispatch(setMetaListStatus(status.FETCHING));
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
      // dispatch(setMetaListStatus(status.FETCHED));
    })
    .catch(err => {
      console.error('err', err);
      // dispatch(setMetaListStatus(status.ERROR, err));
      dispatch({
        type: SET_KEYWORDS,
        searchBy: val,
        keywords: [],
      });
    });
};

export const fetchKeywords = e => (dispatch, getState) => {
  const data = getState().experienceSearch.toJS();
  const val = e ? e.target.value : data.searchBy;
  dispatch({
    type: SET_KEYWORDS,
    searchBy: val,
    keywords: val === 'company' ? ['GoodJob', 'Yahoo', 'MTK'] : ['程序猿', '攻城獅', '猴子'],
  });
  return Promise.resolve();
};
