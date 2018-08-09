import fetchUtil from '../utils/fetchUtil';

import { getExperiences as getExperiencesApi } from '../apis/experiencesApi';

import statusConstant from '../constants/status';

export const SET_SEARCH_BY = 'SET_SEARCH_BY';
export const SET_KEYWORDS = 'SET_KEYWORDS';
export const SET_SORT_AND_EXPERIENCES = 'SET_SORT_AND_EXPERIENCES';
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';

export const setSortAndExperiences = payload => ({
  type: SET_SORT_AND_EXPERIENCES,
  payload,
});

const setLoadingStatus = (status, error = null) => ({
  type: SET_LOADING_STATUS,
  payload: {
    status,
    error,
  },
});

export const fetchExperiences = (
  page,
  limit,
  _sort,
  searchBy,
  searchQuery,
  searchType
) => dispatch => {
  const start = (page - 1) * limit;
  const query = {
    limit,
    start,
    sort: _sort,
    searchBy,
    searchQuery,
    searchType,
  };

  const objCond = {
    sort: _sort,
    searchQuery,
    currentPage: Number(page),
    searchType,
    searchBy,
  };

  dispatch(setLoadingStatus(statusConstant.FETCHING));
  dispatch(
    setSortAndExperiences({
      ...objCond,
      experiences: [],
      experienceCount: 0,
    })
  );

  return getExperiencesApi(query)
    .then(result => {
      const payload = {
        ...objCond,
        experiences: result.experiences,
        experienceCount: result.total,
      };
      dispatch(setLoadingStatus(statusConstant.FETCHED));
      dispatch(setSortAndExperiences(payload));
    })
    .catch(error => {
      dispatch(setLoadingStatus(statusConstant.ERROR, error));
      throw error;
    });
};

const setKeywords = keywords => ({
  type: SET_KEYWORDS,
  keywords,
});

export const getNewSearchBy = searchBy => async dispatch => {
  const keywordName =
    searchBy === 'company' ? 'company_keywords' : 'job_title_keywords';
  const body = {
    query: `{
        ${keywordName}
      }`,
  };

  try {
    const result = await fetchUtil('/graphql')('POST', body);
    if (!result.data) {
      throw new Error(result.error);
    }
    const keywords = result.data[keywordName];
    dispatch(setKeywords(keywords));
  } catch (e) {
    dispatch(setKeywords([]));
  }
};
