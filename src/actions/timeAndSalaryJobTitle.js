import { fetchSearchJobTitle } from '../apis/timeAndSalaryApi';
import fetchingStatus from '../constants/status';

export const SET_JOB_TITLE_DATA = '@@timeAndSalaryJobTitle/SET_JOB_TITLE_DATA';
export const SET_JOB_TITLE_STATUS = '@@timeAndSalaryJobTitle/SET_JOB_TITLE_STATUS';

export const setJobTitleData = (status, sortBy, order, jobTitle, data, error) => ({
  type: SET_JOB_TITLE_DATA,
  sortBy,
  order,
  jobTitle,
  status,
  data,
  error,
});

export const queryJobTitle = ({ sortBy, order, jobTitle }) =>
  (dispatch, getState) => {
    if (sortBy !== getState().timeAndSalaryJobTitle.get('sortBy') || order !== getState().timeAndSalaryJobTitle.get('order') || jobTitle !== getState().timeAndSalaryJobTitle.get('jobTitle')) {
      dispatch(setJobTitleData(fetchingStatus.UNFETCHED, sortBy, order, jobTitle, [], null));
    }

    if (getState().timeAndSalaryJobTitle.get('status') === fetchingStatus.FETCHING) {
      return Promise.resolve();
    }

    dispatch({
      type: SET_JOB_TITLE_STATUS,
      status: fetchingStatus.FETCHING,
    });

    const opt = {
      job_title: jobTitle,
      group_sort_by: sortBy,
      group_sort_order: order,
    };

    return fetchSearchJobTitle(opt).then(data => {
      dispatch(setJobTitleData(fetchingStatus.FETCHED, sortBy, order, jobTitle, data, null));
    }).catch(err => {
      dispatch(setJobTitleData(fetchingStatus.ERROR, sortBy, order, jobTitle, [], err));
    });
  };
