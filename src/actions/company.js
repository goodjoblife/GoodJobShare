import { isGraphqlError } from 'utils/errors';
import STATUS from 'constants/status';
import {
  isFetching,
  isFetched,
  toFetching,
  getFetched,
  getError,
} from 'utils/fetchBox';
import {
  companyStatus as companyStatusSelector,
  companyIndexesBoxSelector,
} from 'selectors/companyAndJobTitle';
import { getCompany as getCompanyApi, queryCompaniesApi } from 'apis/company';

export const SET_STATUS = '@@company/SET_STATUS';
export const SET_INDEX = '@@COMPANY/SET_INDEX';
export const SET_INDEX_COUNT = '@@COMPANY/SET_INDEX_COUNT';

const setStatus = (companyName, status, data = null, error = null) => ({
  type: SET_STATUS,
  companyName,
  status,
  data,
  error,
});

export const fetchCompany = companyName => (dispatch, getState) => {
  const status = companyStatusSelector(companyName)(getState());
  if (status === STATUS.FETCHING || status === STATUS.FETCHED) {
    return;
  }

  dispatch(setStatus(companyName, STATUS.FETCHING));

  return getCompanyApi(companyName)
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

const setIndex = (page, box) => ({
  type: SET_INDEX,
  page,
  box,
});

const setIndexCount = box => ({
  type: SET_INDEX_COUNT,
  box,
});

export const fetchCompanyNames = (page, pageSize) => async (
  dispatch,
  getState,
) => {
  const box = companyIndexesBoxSelector(page)(getState());
  if (isFetching(box) || isFetched(box)) {
    return;
  }

  dispatch(setIndex(page, toFetching()));
  dispatch(setIndexCount(toFetching()));

  try {
    const data = await queryCompaniesApi((page - 1) * pageSize, pageSize);
    dispatch(setIndex(page, getFetched(data.companiesHavingData)));
    dispatch(setIndexCount(getFetched(data.companiesHavingDataCount)));
  } catch (error) {
    if (isGraphqlError(error)) {
      return dispatch(setIndex(page, getError(error)));
    }
    throw error;
  }
};

export default {
  fetchCompany,
  fetchCompanyNames,
};
