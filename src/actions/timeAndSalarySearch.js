import fetchingStatus from 'constants/status';
import { pageType } from 'constants/companyJobTitle';
import {
  fetchSearchCompany as fetchSearchCompanyApi,
  fetchSearchJobTitle as fetchSearchJobTitleApi,
} from 'apis/timeAndSalaryApi';

export const SET_SEARCH_DATA = '@@timeAndSalarySearch/SET_SEARCH_DATA';
export const SET_SEARCH_STATUS = '@@timeAndSalarySearch/SET_SEARCH_STATUS';

export const setSearchData = (status, keyword, data, error) => ({
  type: SET_SEARCH_DATA,
  keyword,
  status,
  data,
  error,
});

export const keywordMinLength = 2;

export const queryKeyword = ({ keyword }) => (dispatch, getState) => {
  if (keyword !== getState().timeAndSalarySearch.keyword) {
    dispatch(setSearchData(fetchingStatus.UNFETCHED, keyword, [], null));
  }

  if (getState().timeAndSalarySearch.status === fetchingStatus.FETCHING) {
    return Promise.resolve();
  }

  // Do not query if keyword is too short
  if (keyword.length < keywordMinLength) {
    return Promise.resolve();
  }

  dispatch({
    type: SET_SEARCH_STATUS,
    status: fetchingStatus.FETCHING,
  });

  const searchCompanies = fetchSearchCompanyApi({
    companyName: keyword,
  }).then(items =>
    items.map(item => ({ ...item, pageType: pageType.COMPANY })),
  );

  const searchJobTitles = fetchSearchJobTitleApi({
    jobTitle: keyword,
  }).then(items =>
    items.map(item => ({ ...item, pageType: pageType.JOB_TITLE })),
  );

  return Promise.all([searchCompanies, searchJobTitles])
    .then(([companyData, jobTitleData]) => [...companyData, ...jobTitleData])
    .then(data => {
      data.sort((a, b) => (b.dataCount || 0) - (a.dataCount || 0));
      dispatch(setSearchData(fetchingStatus.FETCHED, keyword, data, null));
    })
    .catch(err => {
      dispatch(setSearchData(fetchingStatus.ERROR, keyword, [], err));
    });
};
