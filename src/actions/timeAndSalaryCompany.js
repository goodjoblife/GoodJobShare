import fetchingStatus from '../constants/status';

export const SET_COMPANY_DATA = '@@timeAndSalaryCompany/SET_COMPANY_DATA';
export const SET_COMPANY_STATUS = '@@timeAndSalaryCompany/SET_COMPANY_STATUS';
export const SET_PAGE = '@@timeAndSalaryCompany/SET_PAGE';

// TODO: remove these after API is ready
const groupSortBy = 'week_work_time';
const order = 'descending';

export const setCompanyData = (status, companyName, data, error) => ({
  type: SET_COMPANY_DATA,
  companyName,
  status,
  data,
  error,
});

export const setPage = (page, pageSize) => ({
  type: SET_PAGE,
  page,
  pageSize,
});

export const queryCompany = ({ companyName }) => (
  dispatch,
  getState,
  { api },
) => {
  if (companyName !== getState().timeAndSalaryCompany.get('companyName')) {
    dispatch(setCompanyData(fetchingStatus.UNFETCHED, companyName, null, null));
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
    company: companyName,
    group_sort_by: groupSortBy,
    group_sort_order: order,
  };

  return api.timeAndSalary
    .fetchSearchCompany({ opt })
    .then(data => {
      // TODO: substitute new api
      const company = data.pop();
      if (!company) throw new Error('No such company');
      dispatch(
        setCompanyData(fetchingStatus.FETCHED, companyName, company, null),
      );
    })
    .catch(err => {
      dispatch(setCompanyData(fetchingStatus.ERROR, companyName, null, err));
    });
};
