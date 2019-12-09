import fetchingStatus from '../constants/status';
import { pageType } from '../constants/companyJobTitle';

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

export const queryKeyword = ({ keyword }) => (dispatch, getState, { api }) => {
  if (keyword !== getState().timeAndSalarySearch.get('keyword')) {
    dispatch(setSearchData(fetchingStatus.UNFETCHED, keyword, [], null));
  }

  if (
    getState().timeAndSalarySearch.get('status') === fetchingStatus.FETCHING
  ) {
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

  const searchCompanies = api.timeAndSalary
    .fetchSearchCompany({
      companyName: keyword,
    })
    .then(items =>
      items.map(item => ({ ...item, pageType: pageType.COMPANY })),
    );

  const searchJobTitles = api.timeAndSalary
    .fetchSearchJobTitle({
      jobTitle: keyword,
    })
    .then(items =>
      items.map(item => ({ ...item, pageType: pageType.JOB_TITLE })),
    );

  return Promise.all([searchCompanies, searchJobTitles])
    .then(([companyData, jobTitleData]) => [...companyData, ...jobTitleData])
    .then(data => {
      data.sort(
        (a, b) =>
          b.salary_work_time_statistics.count -
          a.salary_work_time_statistics.count,
      );
      dispatch(setSearchData(fetchingStatus.FETCHED, keyword, data, null));
    })
    .catch(err => {
      dispatch(setSearchData(fetchingStatus.ERROR, keyword, [], err));
    });
};
