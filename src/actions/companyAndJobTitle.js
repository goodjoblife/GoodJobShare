import { pageType as PAGE_TYPE } from '../constants/companyJobTitle';
import STATUS, { isFetching, isFetched } from '../constants/status';
import { pageStatus as pageStatusSelector } from '../selectors/companyAndJobTitle';

export const SET_STATUS = '@@companyAndJobTitle/SET_STATUS';

const setStatus = (pageType, pageName, status, data = null, error = null) => ({
  type: SET_STATUS,
  pageType,
  pageName,
  status,
  data,
  error,
});

export const fetchPageData = (pageType, pageName) => (
  dispatch,
  getState,
  { api },
) => {
  const status = pageStatusSelector(pageType, pageName)(getState());
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
          null,
          new Error(`Unrecognized pageType '${pageType}'`),
        ),
      );
      return;
  }

  return promise
    .then(data => {
      dispatch(setStatus(pageType, pageName, STATUS.FETCHED, data));
    })
    .catch(error => {
      dispatch(setStatus(pageType, pageName, STATUS.ERROR, null, error));
      throw error;
    });
};

export default {
  fetchPageData,
};
