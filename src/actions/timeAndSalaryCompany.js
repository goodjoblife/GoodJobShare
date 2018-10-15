import { fetchSearchCompany } from '../apis/timeAndSalaryApi';
import fetchingStatus from '../constants/status';

export const SET_COMPANY_DATA = '@@timeAndSalaryCompany/SET_COMPANY_DATA';
export const SET_COMPANY_STATUS = '@@timeAndSalaryCompany/SET_COMPANY_STATUS';

export const setCompanyData = (
  status,
  groupSortBy,
  order,
  company,
  data,
  error
) => ({
  type: SET_COMPANY_DATA,
  groupSortBy,
  order,
  company,
  status,
  data,
  error,
});

export const queryCompany = ({ groupSortBy, order, company }) => (
  dispatch,
  getState
) => {
  if (
    groupSortBy !== getState().timeAndSalaryCompany.get('groupSortBy') ||
    order !== getState().timeAndSalaryCompany.get('order') ||
    company !== getState().timeAndSalaryCompany.get('company')
  ) {
    dispatch(
      setCompanyData(
        fetchingStatus.UNFETCHED,
        groupSortBy,
        order,
        company,
        [],
        null
      )
    );
  }

  if (
    getState().timeAndSalaryCompany.get('status') === fetchingStatus.FETCHING
  ) {
    return Promise.resolve();
  }

  dispatch({
    type: SET_COMPANY_STATUS,
    status: fetchingStatus.FETCHING,
  });

  const opt = {
    company,
    group_sort_by: groupSortBy,
    group_sort_order: order,
  };

  return fetchSearchCompany(opt)
    .then(data => {
      dispatch(
        setCompanyData(
          fetchingStatus.FETCHED,
          groupSortBy,
          order,
          company,
          data,
          null
        )
      );
    })
    .catch(err => {
      dispatch(
        setCompanyData(
          fetchingStatus.ERROR,
          groupSortBy,
          order,
          company,
          [],
          err
        )
      );
    });
};
