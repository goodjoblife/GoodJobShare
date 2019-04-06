import fetchingStatus from '../constants/status';

export const SET_COMPANY_DATA = '@@timeAndSalaryCompany/SET_COMPANY_DATA';
export const SET_COMPANY_STATUS = '@@timeAndSalaryCompany/SET_COMPANY_STATUS';

export const setCompanyData = (status, companyName, data, error) => ({
  type: SET_COMPANY_DATA,
  companyName,
  status,
  data,
  error,
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

  return api.timeAndSalary
    .fetchCompany({ companyName })
    .then(data => {
      if (!data) throw new Error('No such company');
      dispatch(setCompanyData(fetchingStatus.FETCHED, companyName, data, null));
    })
    .catch(err => {
      dispatch(setCompanyData(fetchingStatus.ERROR, companyName, null, err));
    });
};
