import STATUS, { isFetching, isFetched } from '../constants/status';
import { jobTitleStatus as jobTitleStatusSelector } from '../selectors/companyAndJobTitle';

export const SET_STATUS = '@@jobTitle/SET_STATUS';

const setStatus = (jobTitle, status, data = null, error = null) => ({
  type: SET_STATUS,
  jobTitle,
  status,
  data,
  error,
});

export const fetchJobTitle = jobTitle => (dispatch, getState, { api }) => {
  const status = jobTitleStatusSelector(jobTitle)(getState());
  if (isFetching(status) || isFetched(status)) {
    return;
  }

  dispatch(setStatus(jobTitle, STATUS.FETCHING));

  return api.jobTitle
    .getJobTitle(jobTitle)
    .then(data => {
      dispatch(setStatus(jobTitle, STATUS.FETCHED, data));
    })
    .catch(error => {
      dispatch(setStatus(jobTitle, STATUS.ERROR, null, error));
      throw error;
    });
};

export default {
  fetchJobTitle,
};
