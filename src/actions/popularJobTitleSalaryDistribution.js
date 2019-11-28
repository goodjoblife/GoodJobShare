import fetchingStatus from '../constants/status';

export const SET_STATUS = '@@popularJobTitleSalaryDistribution/SET_STATUS';

const setStatus = ({ status, data = [], error = null }) => ({
  type: SET_STATUS,
  status,
  data,
  error,
});

export const queryPopularJobTitleSalaryDistribution = () => (
  dispatch,
  getState,
  { api },
) => {
  dispatch(setStatus({ status: fetchingStatus.FETCHING }));
  return api.popularCompanyAndJobTitle
    .getPopularJobTitleSalaryDistribution()
    .then(popularJobTitleSalaryDistribution => {
      dispatch(
        setStatus({
          status: fetchingStatus.FETCHED,
          data: popularJobTitleSalaryDistribution,
        }),
      );
    })
    .catch(error => {
      dispatch(setStatus({ status: fetchingStatus.ERROR, error }));
    });
};
