import { isGraphqlError } from 'utils/errors';
import STATUS, { isFetching, isFetched } from 'constants/status';
import {
  jobTitleStatus as jobTitleStatusSelector,
  jobTitlesStatus as jobTitlesStatusSelector,
} from 'selectors/companyAndJobTitle';
import {
  getJobTitle as getJobTitleApi,
  getJobTitles as getJobTitlesApi,
} from 'apis/jobTitle';

export const SET_STATUS = '@@jobTitle/SET_STATUS';
export const SET_INDEX_STATUS = '@@jobTitle/SET_INDEX_STATUS';

const setStatus = (jobTitle, status, data = null, error = null) => ({
  type: SET_STATUS,
  jobTitle,
  status,
  data,
  error,
});

export const fetchJobTitle = jobTitle => (dispatch, getState) => {
  const status = jobTitleStatusSelector(jobTitle)(getState());
  if (isFetching(status) || isFetched(status)) {
    return;
  }

  dispatch(setStatus(jobTitle, STATUS.FETCHING));

  return getJobTitleApi(jobTitle)
    .then(data => {
      dispatch(setStatus(jobTitle, STATUS.FETCHED, data));
    })
    .catch(error => {
      if (isGraphqlError(error)) {
        dispatch(setStatus(jobTitle, STATUS.ERROR, null, error));
      } else {
        // Unexpected error
        throw error;
      }
    });
};

const setIndexStatus = (status, data = null, error = null) => ({
  type: SET_INDEX_STATUS,
  status,
  data,
  error,
});

export const fetchJobTitles = () => async (dispatch, getState) => {
  const status = jobTitlesStatusSelector(getState());
  if (isFetching(status) || isFetched(status)) {
    return;
  }

  dispatch(setIndexStatus(STATUS.FETCHING));
  try {
    const jobTitles = await getJobTitlesApi();
    dispatch(setIndexStatus(STATUS.FETCHED, jobTitles));
  } catch (error) {
    if (isGraphqlError(error)) {
      dispatch(setIndexStatus(STATUS.ERROR, null, error));
    } else {
      throw error;
    }
  }
};

export default {
  fetchJobTitle,
  fetchJobTitles,
};
