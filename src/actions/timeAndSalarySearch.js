import fetchingStatus from '../constants/status';

export const SET_SEARCH_DATA = '@@timeAndSalarySearch/SET_SEARCH_DATA';
export const SET_SEARCH_STATUS = '@@timeAndSalarySearch/SET_SEARCH_STATUS';

export const setSearchData = (
  status,
  groupSortBy,
  order,
  keyword,
  data,
  error,
) => ({
  type: SET_SEARCH_DATA,
  groupSortBy,
  order,
  keyword,
  status,
  data,
  error,
});

export const queryKeyword = ({ groupSortBy, order, keyword }) => (
  dispatch,
  getState,
  { api },
) => {
  if (
    groupSortBy !== getState().timeAndSalarySearch.get('groupSortBy') ||
    order !== getState().timeAndSalarySearch.get('order') ||
    keyword !== getState().timeAndSalarySearch.get('keyword')
  ) {
    dispatch(
      setSearchData(
        fetchingStatus.UNFETCHED,
        groupSortBy,
        order,
        keyword,
        [],
        null,
      ),
    );
  }

  if (
    getState().timeAndSalarySearch.get('status') === fetchingStatus.FETCHING
  ) {
    return Promise.resolve();
  }

  dispatch({
    type: SET_SEARCH_STATUS,
    status: fetchingStatus.FETCHING,
  });

  const opt = {
    company: keyword,
    group_sort_by: groupSortBy,
    group_sort_order: order,
  };

  return api.timeAndSalary
    .fetchSearchCompany({ opt })
    .then(data => {
      dispatch(
        setSearchData(
          fetchingStatus.FETCHED,
          groupSortBy,
          order,
          keyword,
          data,
          null,
        ),
      );
    })
    .catch(err => {
      dispatch(
        setSearchData(
          fetchingStatus.ERROR,
          groupSortBy,
          order,
          keyword,
          [],
          err,
        ),
      );
    });
};
