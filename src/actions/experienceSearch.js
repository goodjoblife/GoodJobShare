import fetchUtil from '../utils/fetchUtil';

import {
  getExperiences as getExperiencesApi,
} from '../apis/experiencesApi';

import {
  PAGE_COUNT,
} from '../constants/experienceSearch';

import {
  searchBySelector,
  sortSelector,
  searchQuerySelector,
} from '../selectors/experienceSearchSelector';

export const SET_SEARCH_TYPE = 'SET_SEARCH_TYPE';
export const SET_SEARCH_BY = 'SET_SEARCH_BY';
export const SET_EXPERIENCES = 'SET_EXPERIENCES';
export const SET_WORKINGS = 'SET_WORKINGS';
export const SET_KEYWORD = 'SET_KEYWORD';
export const SET_KEYWORDS = 'SET_KEYWORDS';
export const SET_SORT_AND_EXPERIENCES = 'SET_SORT_AND_EXPERIENCES';
export const SET_KEYWORDS_AND_EXPERIENCES = 'SET_KEYWORDS_AND_EXPERIENCES';

export const setSearchType = searchType => ({
  type: SET_SEARCH_TYPE,
  searchType,
});

export const setKeyword = keyword => ({
  type: SET_KEYWORD,
  keyword,
});

export const setSortAndExperiences = payload => ({
  type: SET_SORT_AND_EXPERIENCES,
  payload,
});

export const fetchExperiences = (page, limit, _sort, searchBy, searchQuery) => (dispatch, getState) => {
  const data = getState().experienceSearch.toJS();
  const start = page * limit;
  const query = {
    limit,
    start,
    sort: _sort,
    searchBy,
    searchQuery,
  };
  let hasMore = false;

  const objCond = {
    sort: _sort,
    keyword: '',
    searchQuery,
    workings: '',
    salary: true,
  };

  return getExperiencesApi(query)
    .then(result => {
      hasMore = (start + limit) < result.total;

      const payload = {
        ...objCond,
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
  const searchBy = searchBySelector(state);
  const sort = sortSelector(state);
  const searchQuery = searchQuerySelector(state);
  return dispatch(
    fetchExperiences(nextPage, PAGE_COUNT, sort, searchBy, searchQuery)
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
