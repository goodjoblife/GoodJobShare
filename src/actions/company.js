import { isGraphqlError } from 'utils/errors';

import STATUS, { isFetching, isFetched } from '../constants/status';
import {
  companyStatus as companyStatusSelector,
  companyNamesStatus as companyNamesStatusSelector,
} from '../selectors/companyAndJobTitle';

export const SET_STATUS = '@@company/SET_STATUS';
export const SET_INDEX_STATUS = '@@company/SET_INDEX_STATUS';

const setStatus = (companyName, status, data = null, error = null) => ({
  type: SET_STATUS,
  companyName,
  status,
  data,
  error,
});

export const fetchCompany = companyName => (dispatch, getState, { api }) => {
  const status = companyStatusSelector(companyName)(getState());
  if (isFetching(status) || isFetched(status)) {
    return;
  }

  dispatch(setStatus(companyName, STATUS.FETCHING));

  return api.company
    .getCompany(companyName)
    .then(data => {
      dispatch(setStatus(companyName, STATUS.FETCHED, data));
    })
    .catch(error => {
      if (isGraphqlError(error)) {
        dispatch(setStatus(companyName, STATUS.ERROR, null, error));
      } else {
        // Unexpected error
        throw error;
      }
    });
};

const setIndexStatus = (status, data = null, error = null) => ({
  type: SET_INDEX_STATUS,
  status,
  data,
  error,
});

export const fetchCompanyNames = () => async (dispatch, getState, { api }) => {
  const status = companyNamesStatusSelector(getState());
  if (isFetching(status) || isFetched(status)) {
    return;
  }

  dispatch(setIndexStatus(STATUS.FETCHING));
  try {
    const companyNames = await api.company.getCompanyNames();
    dispatch(setIndexStatus(STATUS.FETCHED, companyNames));
  } catch (error) {
    if (isGraphqlError(error)) {
      dispatch(setIndexStatus(STATUS.ERROR, null, error));
    } else {
      throw error;
    }
  }
};

export default {
  fetchCompany,
  fetchCompanyNames,
};
