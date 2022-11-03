import fetchingStatus from '../constants/status';

export const SET_STATUS = '@@popularCompanyAverageSalary/SET_STATUS';

const setStatus = ({ status, data = [], error = null }) => ({
  type: SET_STATUS,
  status,
  data,
  error,
});

export const queryPopularCompanyAverageSalary = () => (
  dispatch,
  getState,
  { api },
) => {
  dispatch(setStatus({ status: fetchingStatus.FETCHING }));
  return api.popularCompanyAndJobTitle
    .getPopularCompanyAverageSalary()
    .then(popularCompanyAverageSalary => {
      dispatch(
        setStatus({
          status: fetchingStatus.FETCHED,
          data: popularCompanyAverageSalary,
        }),
      );
    })
    .catch(error => {
      dispatch(setStatus({ status: fetchingStatus.ERROR, error }));
    });
};
