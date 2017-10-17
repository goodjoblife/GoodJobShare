import fetchUtil from '../utils/fetchUtil';

import {
  PAGE_COUNT,
} from '../constants/experienceSearch';

import {
  searchBySelector,
  sortSelector,
} from '../selectors/experienceSearchSelector';

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

export const setSortAndExperiences = payload => ({
  type: SET_SORT_AND_EXPERIENCES,
  payload,
});

export const fetchExperiences = (cond, val, page, limit, _sort, searchBy) => (dispatch, getState) => {
  const data = getState().experienceSearch.toJS();
  const sort = val || _sort;
  const start = (typeof page === 'number' ? page : 0) * limit;
  let url = `/experiences?start=${start}&limit=${limit}`;
  let objCond;
  let hasMore = false;

  if (cond === 'searchBy') {
    url = `${url}&search_by=${searchBy}&search_query=${val}`;

    objCond = {
      keyword: val,
      searchQuery: val,
    };
  } else { // cond === 'sort'
    url = `${url}&sort=${sort}`;

    objCond = {
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

      const payload = {
        ...objCond,
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
      };
      dispatch(setSortAndExperiences(payload));
    })
    .catch(error => {
      const payload = {
        ...objCond,
        prevCond: cond,
        prevValue: val,
        // prevPage: (page ? page - 1 : page),
        error,
        salary: false,
        experiences: [],
        experienceCount: 0,
        hasMore,
      };

      dispatch(setSortAndExperiences(payload));
    });
};

export const fetchMoreExperiences = nextPage => (dispatch, getState) => {
  const state = getState();
  const data = getState().experienceSearch.toJS();
  const searchBy = searchBySelector(state);
  const sort = sortSelector(state);
  return dispatch(
    fetchExperiences(data.prevCond, data.prevValue, nextPage, PAGE_COUNT, sort, searchBy)
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
