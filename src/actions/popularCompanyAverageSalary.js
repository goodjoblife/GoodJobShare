import { getError, getFetched, toFetching } from 'utils/fetchBox';

export const SET_POPULAR_COMPANY_AVERAGE_SALARY =
  '@@POPULAR_COMPANY_AVERAGE_SALARY/SET_BOX';

const setPopularCompanyAverageSalary = box => ({
  type: SET_POPULAR_COMPANY_AVERAGE_SALARY,
  popularCompanyAverageSalary: box,
});

export const queryPopularCompanyAverageSalary = () => async (
  dispatch,
  getState,
  { api },
) => {
  dispatch(setPopularCompanyAverageSalary(toFetching()));

  const popularCompanyAverageSalary = await api.popularCompanyAndJobTitle.getPopularCompanyAverageSalary();

  try {
    dispatch(
      setPopularCompanyAverageSalary(getFetched(popularCompanyAverageSalary)),
    );
  } catch (error) {
    dispatch(setPopularCompanyAverageSalary(getError(error)));
  }
};
