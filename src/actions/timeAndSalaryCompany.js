import fetchingStatus from '../constants/status';

export const SET_COMPANY = '@@timeAndSalaryCompany/SET_COMPANY';
export const SET_STATUS = '@@timeAndSalaryCompany/SET_STATUS';

const groupSortBy = 'week_work_time';
const order = 'descending';

export const setCompany = (status, companyName, data, error) => ({
  type: SET_COMPANY,
  status,
  companyName,
  data,
  error,
});

export const queryCompany = ({ companyName }) => (
  dispatch,
  getState,
  { api },
) => {
  if (companyName !== getState().timeAndSalaryCompany.get('companyName')) {
    dispatch(setCompany(fetchingStatus.UNFETCHED, companyName, null, null));
  }

  if (
    getState().timeAndSalaryCompany.get('status') === fetchingStatus.FETCHING
  ) {
    return Promise.resolve();
  }

  dispatch({
    type: SET_STATUS,
    status: fetchingStatus.FETCHING,
  });

  const opt = {
    group_sort_by: groupSortBy,
    group_sort_order: order,
  };

  return api.timeAndSalary
    .fetchSearchCompany({
      opt: {
        ...opt,
        company: companyName,
      },
    })
    .then(data => {
      const company = data.pop();
      if (!company) throw new Error('No such company');
      dispatch(setCompany(fetchingStatus.FETCHED, companyName, company, null));
    })
    .catch(err => {
      dispatch(setCompany(fetchingStatus.ERROR, companyName, null, err));
    });
};
