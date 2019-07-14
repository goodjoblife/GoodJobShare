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

export const fetchPageData = (pageType, pageName) => (
  dispatch,
  getState,
  { api },
) => {
  if (!isStateConsistent(pageType, pageName)(getState())) {
    setStatus(pageType, pageName, STATUS.UNFETCHED);
  }

  const status = statusSelector(getState());
  if (isFetching(status) || isFetched(status)) {
    return;
  }

  dispatch(setStatus(pageType, pageName, STATUS.FETCHING));

  let promise;
  switch (pageType) {
    case PAGE_TYPE.COMPANY:
      promise = api.companyAndJobTitle.getCompany(pageName);
      break;
    case PAGE_TYPE.JOB_TITLE:
      promise = api.companyAndJobTitle.getJobTitle(pageName);
      break;
    default:
      dispatch(
        setStatus(
          pageType,
          pageName,
          STATUS.ERROR,
          new Error(`Unrecognized pageType '${pageType}'`),
        ),
      );
      return;
  }

  return promise
    .then(data => {
      if (!isStateConsistent(pageType, pageName)(getState())) {
        return;
      }
      dispatch(setData(data));
      dispatch(setStatus(pageType, pageName, STATUS.FETCHED));
    })
    .catch(error => {
      if (!isStateConsistent(pageType, pageName)(getState())) {
        return;
      }
      dispatch(setStatus(pageType, pageName, STATUS.ERROR, error));
      throw error;
    });
};
