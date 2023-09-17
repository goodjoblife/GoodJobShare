import { getError, getFetched, toFetching } from 'utils/fetchBox';

export const SET_STATE = '@@POPULAR_JOB_TITLE_SALARY_DISTRIBUTION/SET_STATE';

const setState = state => ({ type: SET_STATE, state });

export const queryPopularJobTitleSalaryDistribution = () => async (
  dispatch,
  getState,
  { api },
) => {
  dispatch(setState(toFetching()));

  const popularJobTitleSalaryDistribution = await api.popularCompanyAndJobTitle.getPopularJobTitleSalaryDistribution();

  try {
    dispatch(setState(getFetched(popularJobTitleSalaryDistribution)));
  } catch (error) {
    dispatch(setState(getError(error)));
  }
};
