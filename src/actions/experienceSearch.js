import fetchUtil from '../utils/fetchUtil';

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

export const fetchExperiences = (cond, val, page, count) => (dispatch, getState) => {
  const data = getState().experienceSearch.toJS();
  const sort = val || data.sort;
  const limit = typeof count === 'number' ? count : 20;
  const start = (typeof page === 'number' ? page : 0) * limit;
  let url = `/experiences?start=${start}&limit=${limit}`;
  let objCond;
  let hasMore = false;

  if (cond === 'searchBy') {
    url = `${url}&search_by=${data.searchBy}&search_query=${val}`;

    objCond = {
      type: SET_SEARCH_QUERY_AND_EXPERIENCES,
      keyword: val,
      searchQuery: val,
    };
  } else { // cond === 'sort'
    url = `${url}&sort=${sort}`;

    objCond = {
      type: SET_SORT_AND_EXPERIENCES,
      sort,
      keyword: '',
      searchQuery: '',
      workings: '',
      salary: true,
    };
  }
  return fetchUtil(url)('GET')
    .then(result => {
      hasMore = (start + limit) < result.total;
      dispatch(Object.assign(objCond, {
        prevCond: cond,
        prevValue: val,
        // prevPage: page,
        error: null,
        experiences: (
          page
          ? [...data.experiences, ...result.experiences]
          : result.experiences
        ),
        experienceCount: result.total,
        hasMore,
      }));
    })
    .catch(error => {
      dispatch(Object.assign(objCond, {
        prevCond: cond,
        prevValue: val,
        // prevPage: (page ? page - 1 : page),
        error,
        salary: false,
        experiences: [],
        experienceCount: 0,
        hasMore,
      }));
    });
};

export const fetchMoreExperiences = nextPage => (dispatch, getState) => {
  const data = getState().experienceSearch.toJS();
  return dispatch(
    fetchExperiences(data.prevCond, data.prevValue, nextPage)
  );
};

export const fetchWorkings = val => (dispatch, getState) => {
  const data = getState().experienceSearch.toJS();
  const url = `/workings/search_by/${data.searchBy}/group_by/company?${data.searchBy}=${val}`;

  return fetchUtil(url)('GET')
    .then(result => {
      if (result.error) {
        dispatch({
          type: SET_WORKINGS,
          workings: [],
        });
        return;
      }
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

const KEYWORD_NUM = 5;
export const fetchKeywords = e => (dispatch, getState) => {
  const data = getState().experienceSearch.toJS();
  const val = e ? e.target.value : data.searchBy;
  const url = val === 'company' ? `/company_keywords?num=${KEYWORD_NUM}` : `/job_title_keywords?num=${KEYWORD_NUM}`;
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
