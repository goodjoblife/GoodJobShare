import STATUS from '../constants/status';

export const SET_DATA = '@@companyAndJobTitle/SET_DATA';
export const SET_STATUS = '@@companyAndJobTitle/SET_STATUS';

const setData = data => ({
  type: SET_DATA,
  data,
});

const setStatus = (status, error = null) => ({
  type: SET_STATUS,
  status,
  error,
});

export const fetchCompany = companyName => (dispatch, getState, { api }) => {
  dispatch(setStatus(STATUS.FETCHING));
  return api.companyAndJobTitle
    .getCompany(companyName)
    .then(data => {
      dispatch(setData(data));
      dispatch(setStatus(STATUS.FETCHED));
    })
    .catch(error => {
      dispatch(setStatus(STATUS.ERROR, error));
      throw error;
    });
};
