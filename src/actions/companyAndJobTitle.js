import { pageType as PAGE_TYPE } from '../constants/companyJobTitle';
import STATUS, { isFetching, isFetched } from '../constants/status';
import {
  pageType as pageTypeSelector,
  pageName as pageNameSelector,
  status as statusSelector,
} from '../selectors/companyAndJobTitle';

export const SET_DATA = '@@companyAndJobTitle/SET_DATA';
export const SET_STATUS = '@@companyAndJobTitle/SET_STATUS';

const setData = data => ({
  type: SET_DATA,
  data,
});

const setStatus = (pageType, pageName, status, error = null) => ({
  type: SET_STATUS,
  pageType,
  pageName,
  status,
  error,
});

const isStateConsistent = (pageType, pageName) => state =>
  pageTypeSelector(state) === pageType && pageNameSelector(state) === pageName;

export const fetchCompany = companyName => (dispatch, getState, { api }) => {
  if (!isStateConsistent(PAGE_TYPE.COMPANY, companyName)(getState())) {
    setStatus(PAGE_TYPE.COMPANY, companyName, STATUS.UNFETCHED);
  }

  const status = statusSelector(getState());
  if (isFetching(status) || isFetched(status)) {
    return;
  }

  dispatch(setStatus(PAGE_TYPE.COMPANY, companyName, STATUS.FETCHING));
  return api.companyAndJobTitle
    .getCompany(companyName)
    .then(data => {
      if (!isStateConsistent(PAGE_TYPE.COMPANY, companyName)(getState())) {
        return;
      }
      dispatch(setData(data));
      dispatch(setStatus(PAGE_TYPE.COMPANY, companyName, STATUS.FETCHED));
    })
    .catch(error => {
      if (!isStateConsistent(PAGE_TYPE.COMPANY, companyName)(getState())) {
        return;
      }
      dispatch(setStatus(PAGE_TYPE.COMPANY, companyName, STATUS.ERROR, error));
      throw error;
    });
};

export const fetchJobTitle = jobTitle => (dispatch, getState, { api }) => {
  if (!isStateConsistent(PAGE_TYPE.JOB_TITLE, jobTitle)(getState())) {
    setStatus(PAGE_TYPE.JOB_TITLE, jobTitle, STATUS.UNFETCHED);
  }

  const status = statusSelector(getState());
  if (isFetching(status) || isFetched(status)) {
    return;
  }

  dispatch(setStatus(PAGE_TYPE.JOB_TITLE, jobTitle, STATUS.FETCHING));
  return api.companyAndJobTitle
    .getJobTitle(jobTitle)
    .then(data => {
      if (!isStateConsistent(PAGE_TYPE.JOB_TITLE, jobTitle)(getState())) {
        return;
      }
      dispatch(setData(data));
      dispatch(setStatus(PAGE_TYPE.JOB_TITLE, jobTitle, STATUS.FETCHED));
    })
    .catch(error => {
      if (!isStateConsistent(PAGE_TYPE.JOB_TITLE, jobTitle)(getState())) {
        return;
      }
      dispatch(setStatus(PAGE_TYPE.JOB_TITLE, jobTitle, STATUS.ERROR, error));
      throw error;
    });
};
