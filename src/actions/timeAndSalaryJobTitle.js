import fetchingStatus from '../constants/status';

export const SET_JOB_TITLE_DATA = '@@timeAndSalaryJobTitle/SET_JOB_TITLE_DATA';
export const SET_JOB_TITLE_STATUS =
  '@@timeAndSalaryJobTitle/SET_JOB_TITLE_STATUS';

// TODO: remove these after API is ready
const groupSortBy = 'week_work_time';
const order = 'descending';

export const setJobTitleData = (status, jobTitle, data, error) => ({
  type: SET_JOB_TITLE_DATA,
  jobTitle,
  status,
  data,
  error,
});

export const queryJobTitle = ({ jobTitle }) => (
  dispatch,
  getState,
  { api },
) => {
  if (jobTitle !== getState().timeAndSalaryJobTitle.get('jobTitle')) {
    dispatch(setJobTitleData(fetchingStatus.UNFETCHED, jobTitle, null, null));
  }

  if (
    getState().timeAndSalaryJobTitle.get('status') === fetchingStatus.FETCHING
  ) {
    return Promise.resolve();
  }

  dispatch({
    type: SET_JOB_TITLE_STATUS,
    status: fetchingStatus.FETCHING,
  });

  const opt = {
    job_title: jobTitle,
    group_sort_by: groupSortBy,
    group_sort_order: order,
  };

  return api.timeAndSalary
    .fetchSearchJobTitle({ opt })
    .then(data => {
      // TODO: substitute new api
      const job = data.pop();
      if (!job) throw new Error('No such job title');
      dispatch(setJobTitleData(fetchingStatus.FETCHED, jobTitle, job, null));
    })
    .catch(err => {
      dispatch(setJobTitleData(fetchingStatus.ERROR, jobTitle, null, err));
    });
};
