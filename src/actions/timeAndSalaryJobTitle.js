import fetchingStatus from '../constants/status';

export const SET_JOB_TITLE = '@@timeAndSalaryJobTitle/SET_JOB_TITLE';
export const SET_STATUS = '@@timeAndSalaryJobTitle/SET_STATUS';
export const SET_PAGE = '@@timeAndSalaryJobTitle/SET_PAGE';

const groupSortBy = 'week_work_time';
const order = 'descending';

export const setJobTitle = (status, jobTitle, data, error) => ({
  type: SET_JOB_TITLE,
  status,
  jobTitle,
  data,
  error,
});

export const setPage = (page, pageSize) => ({
  type: SET_PAGE,
  page,
  pageSize,
});

export const queryJobTitle = ({ jobTitle }) => (
  dispatch,
  getState,
  { api },
) => {
  if (jobTitle !== getState().timeAndSalaryJobTitle.get('jobTitle')) {
    dispatch(setJobTitle(fetchingStatus.UNFETCHED, jobTitle, null, null));
  }

  if (
    getState().timeAndSalaryJobTitle.get('status') === fetchingStatus.FETCHING
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
    .fetchSearchJobTitle({
      opt: {
        ...opt,
        job_title: jobTitle,
      },
    })
    .then(data => {
      const job = data.pop();
      if (!job) throw new Error('No such job title');
      dispatch(setJobTitle(fetchingStatus.FETCHED, jobTitle, job, null));
    })
    .catch(err => {
      dispatch(setJobTitle(fetchingStatus.ERROR, jobTitle, null, err));
    });
};
