import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';
import { SET_POPULAR_COMPANY_AVERAGE_SALARY } from 'actions/popularCompanyAverageSalary';

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
    [SET_POPULAR_COMPANY_AVERAGE_SALARY]: (
      _,
      { popularCompanyAverageSalary },
    ) => popularCompanyAverageSalary,
  },
  { resetOnLogOut: false },
);
