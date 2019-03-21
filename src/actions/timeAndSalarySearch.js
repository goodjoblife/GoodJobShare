import fetchingStatus from '../constants/status';

export const SET_SEARCH_DATA = '@@timeAndSalarySearch/SET_SEARCH_DATA';
export const SET_SEARCH_STATUS = '@@timeAndSalarySearch/SET_SEARCH_STATUS';

export const setSearchData = (status, searchBy, keyword, data, error) => ({
  type: SET_SEARCH_DATA,
  searchBy,
  keyword,
  status,
  data,
  error,
});

export const keywordMinLength = 2;

export const queryKeyword = ({ searchBy, keyword }) => (
  dispatch,
  getState,
  { api },
) => {
  if (
    searchBy !== getState().timeAndSalarySearch.get('searchBy') ||
    keyword !== getState().timeAndSalarySearch.get('keyword')
  ) {
    dispatch(
      setSearchData(fetchingStatus.UNFETCHED, searchBy, keyword, [], null),
    );
  }

  if (
    getState().timeAndSalarySearch.get('status') === fetchingStatus.FETCHING
  ) {
    return Promise.resolve();
  }

  // Do not query if keyword is too short
  if (keyword.length <= keywordMinLength) {
    return Promise.resolve();
  }

  dispatch({
    type: SET_SEARCH_STATUS,
    status: fetchingStatus.FETCHING,
  });

  let promise;

  if (searchBy === 'company') {
    promise = api.timeAndSalary.fetchSearchCompany({
      companyName: keyword,
    });
  } else if (searchBy === 'job_title') {
    promise = api.timeAndSalary.fetchSearchJobTitle({
      jobTitle: keyword,
    });
  } else {
    // TODO: handle unexpected case
    return dispatch(
      setSearchData(
        fetchingStatus.ERROR,
        searchBy,
        keyword,
        [],
        new Error('Unrecognized parameter: searchBy'),
      ),
    );
  }

  return promise
    .then(data => {
      dispatch(
        setSearchData(fetchingStatus.FETCHED, searchBy, keyword, data, null),
      );
    })
    .catch(err => {
      dispatch(setSearchData(fetchingStatus.ERROR, searchBy, keyword, [], err));
    });
};
