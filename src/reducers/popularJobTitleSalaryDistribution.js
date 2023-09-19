import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';
import { SET_POPULAR_JOB_TITLE_SALARY_DISTRIBUTION } from 'actions/popularJobTitleSalaryDistribution';

/*
  PropTypes.arrayOf(
    PropTypes.shape({
      job_title: PropTypes.shape({
        name: PropTypes.string,
      }),
      bins: PropTypes.array,
    }),
  )
*/

const preloadedState = getUnfetched();

export default createReducer(
  preloadedState,
  {
    [SET_POPULAR_JOB_TITLE_SALARY_DISTRIBUTION]: (
      _,
      { popularJobTitleSalaryDistribution },
    ) => popularJobTitleSalaryDistribution,
  },
  { resetOnLogOut: false },
);
