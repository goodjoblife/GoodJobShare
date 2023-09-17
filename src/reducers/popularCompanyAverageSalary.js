import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';
import { SET_STATE } from 'actions/popularCompanyAverageSalary';

/*
  PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.shape({
        name: PropTypes.string,
      }),
      average_salaries: PropTypes.array,
    })
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
