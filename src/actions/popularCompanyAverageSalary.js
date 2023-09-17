import { getError, getFetched, toFetching } from 'utils/fetchBox';

export const SET_STATE = '@@POPULAR_COMPANY_AVERAGE_SALARY/SET_STATE';

const setState = state => ({ type: SET_STATE, state });

export const queryPopularCompanyAverageSalary = () => async (
  dispatch,
  getState,
  { api },
) => {
  dispatch(setState(toFetching()));

  const popularCompanyAverageSalary = await api.popularCompanyAndJobTitle.getPopularCompanyAverageSalary();

  try {
    dispatch(setState(getFetched(popularCompanyAverageSalary)));
  } catch (error) {
    dispatch(setState(getError(error)));
  }
};
