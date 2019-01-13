import fetchingStatus from '../constants/status';

export const SET_JOB_TITLE_DATA = '@@timeAndSalaryJobTitle/SET_JOB_TITLE_DATA';
export const SET_JOB_TITLE_STATUS =
  '@@timeAndSalaryJobTitle/SET_JOB_TITLE_STATUS';

export const setJobTitleData = (
  status,
  groupSortBy,
  order,
  jobTitle,
  data,
  error,
) => ({
  type: SET_JOB_TITLE_DATA,
  groupSortBy,
  order,
  jobTitle,
  status,
  data,
  error,
});

export const queryJobTitle = ({ groupSortBy, order, jobTitle }) => (
  dispatch,
  getState,
  { api },
) => {
  if (
    groupSortBy !== getState().timeAndSalaryJobTitle.get('groupSortBy') ||
    order !== getState().timeAndSalaryJobTitle.get('order') ||
    jobTitle !== getState().timeAndSalaryJobTitle.get('jobTitle')
  ) {
    dispatch(
      setJobTitleData(
        fetchingStatus.UNFETCHED,
        groupSortBy,
        order,
        jobTitle,
        [],
        null,
      ),
    );
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
      dispatch(
        setJobTitleData(
          fetchingStatus.FETCHED,
          groupSortBy,
          order,
          jobTitle,
          data,
          null,
        ),
      );
    })
    .catch(err => {
      dispatch(
        setJobTitleData(
          fetchingStatus.ERROR,
          groupSortBy,
          order,
          jobTitle,
          [],
          err,
        ),
      );
    });
};
