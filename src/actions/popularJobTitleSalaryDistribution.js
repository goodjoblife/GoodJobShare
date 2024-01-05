import { getError, getFetched, toFetching } from 'utils/fetchBox';
import { getPopularJobTitleSalaryDistribution as getPopularJobTitleSalaryDistributionApi } from 'apis/popularCompanyAndJobTitle';

export const SET_POPULAR_JOB_TITLE_SALARY_DISTRIBUTION =
  '@@POPULAR_JOB_TITLE_SALARY_DISTRIBUTION/SET_BOX';

const setPopularJobTitleSalaryDistribution = box => ({
  type: SET_POPULAR_JOB_TITLE_SALARY_DISTRIBUTION,
  popularJobTitleSalaryDistribution: box,
});

export const queryPopularJobTitleSalaryDistribution = () => async (
  dispatch,
  getState,
) => {
  dispatch(setPopularJobTitleSalaryDistribution(toFetching()));

  const popularJobTitleSalaryDistribution = await getPopularJobTitleSalaryDistributionApi();

  try {
    dispatch(
      setPopularJobTitleSalaryDistribution(
        getFetched(popularJobTitleSalaryDistribution),
      ),
    );
  } catch (error) {
    dispatch(setPopularJobTitleSalaryDistribution(getError(error)));
  }
};
