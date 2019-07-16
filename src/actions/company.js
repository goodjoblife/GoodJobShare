import STATUS, { isFetching, isFetched } from '../constants/status';
import { companyStatus as companyStatusSelector } from '../selectors/company';

export const SET_STATUS = '@@company/SET_STATUS';

const setStatus = (companyName, status, data = null, error = null) => ({
  type: SET_STATUS,
  companyName,
  status,
  data,
  error,
});

export const fetchCompany = companyName => (dispatch, getState, { api }) => {
  const status = companyStatusSelector(companyName)(getState());
  if (isFetching(status) || isFetched(status)) {
    return;
  }

  dispatch(setStatus(companyName, STATUS.FETCHING));

  return api.company
    .getCompany(companyName)
    .then(data => {
      dispatch(setStatus(companyName, STATUS.FETCHED, data));
    })
    .catch(error => {
      dispatch(setStatus(companyName, STATUS.ERROR, null, error));
      throw error;
    });
};

export default {
  fetchCompany,
};
