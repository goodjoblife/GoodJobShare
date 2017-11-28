import fetchUtil from '../utils/fetchUtil';

import {
  getExperiences as getExperiencesApi,
} from '../apis/experiencesApi';

import status from '../constants/status';


export const SET_SEARCH_BY = 'SET_SEARCH_BY';
export const SET_EXPERIENCES = 'SET_EXPERIENCES';
export const SET_WORKINGS = 'SET_WORKINGS';
export const SET_KEYWORD = 'SET_KEYWORD';
export const SET_KEYWORDS = 'SET_KEYWORDS';
export const SET_SORT_AND_EXPERIENCES = 'SET_SORT_AND_EXPERIENCES';
export const SET_KEYWORDS_AND_EXPERIENCES = 'SET_KEYWORDS_AND_EXPERIENCES';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';

export const setKeyword = keyword => ({
  type: SET_KEYWORD,
  keyword,
});

export const setSortAndExperiences = payload => ({
  type: SET_SORT_AND_EXPERIENCES,
  payload,
});

export const setWorkings = workings => ({
  type: SET_WORKINGS,
  workings,
});

export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE,
  payload: {
    currentPage,
  },
});

const setLoadintStatus = loadingStatus => ({
  type: SET_LOADING_STATUS,
  payload: {
    loadingStatus,
  },
});

export const fetchExperiences = (page, limit, _sort, searchBy, searchQuery, searchType) => dispatch => {
  const start = (page - 1) * limit;
  const query = {
    limit,
    start,
    sort: _sort,
    searchBy,
    searchQuery,
    searchType,
  };
  let hasMore = false;

  const objCond = {
    sort: _sort,
    searchQuery,
    workings: '',
    currentPage: Number(page),
    searchType,
  };

  dispatch(setLoadintStatus(status.FETCHING));

  return getExperiencesApi(query)
    .then(result => {
      hasMore = (start + limit) < result.total;

      const payload = {
        ...objCond,
        error: null,
        experiences: (
          result.experiences
        ),
        experienceCount: result.total,
        hasMore,
        loadingStatus: status.FETCHED,
      };
      dispatch(setSortAndExperiences(payload));
    })
    .catch(error => {
      const payload = {
        ...objCond,
        error,
        experiences: [],
        experienceCount: 0,
        hasMore,
        loadingStatus: status.ERROR,
      };

      dispatch(setSortAndExperiences(payload));
      throw error;
    });
};

export const fetchWorkings = (searchBy, searchQuery) => dispatch => {
  const url = `/workings/search_by/${searchBy}/group_by/company?${searchBy}=${searchQuery}`;

  return fetchUtil(url)('GET')
    .then(result => {
      if (result.error) {
        dispatch(setWorkings([]));
        return;
      }
      dispatch(setWorkings(result));
    })
    .catch(e => {
      dispatch(setWorkings([]));
      throw e;
    });
};

const setKeywords = keywords => ({
  type: SET_KEYWORDS,
  keywords,
});

const setSearchBy = searchBy => ({
  type: SET_SEARCH_BY,
  searchBy,
});

export const getNewSearchBy = searchBy => dispatch => {
  const url = searchBy === 'company' ? '/company_keywords' : '/job_title_keywords';
  return fetchUtil(url)('GET')
    .then(result => {
      dispatch(setSearchBy(searchBy));
      dispatch(setKeywords(result.keywords));
    })
    .catch(e => {
      dispatch(setSearchBy(searchBy));
      dispatch(setKeywords([]));
      throw e;
    });
};
