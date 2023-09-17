import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';
import { SET_STATE } from 'actions/popularJobTitleSalaryDistribution';

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
    [SET_STATE]: (_, { state }) => state,
  },
  { resetOnLogOut: false },
);
