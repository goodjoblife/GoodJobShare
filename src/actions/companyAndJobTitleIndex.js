import R from 'ramda';
import { isGraphqlError } from 'utils/errors';

import { pageType as PAGE_TYPE } from '../constants/companyJobTitle';
import STATUS, { isFetching, isFetched } from '../constants/status';
import { pageTypeStatus as pageTypeStatusSelector } from '../selectors/companyAndJobTitleIndex';

export const SET_STATUS = '@@companyAndJobTitleIndex/SET_STATUS';

const setStatus = (pageType, status, data = null, error = null) => ({
  type: SET_STATUS,
  pageType,
  status,
  data,
  error,
});

const pageTypeToAPISelector = {
  [PAGE_TYPE.COMPANY]: R.path(['company', 'getCompanyNames']),
  [PAGE_TYPE.JOB_TITLE]: R.path(['jobTitle', 'getJobTitles']),
};

export const fetchPageNames = ({ pageType }) => async (
  dispatch,
  getState,
  { api },
) => {
  const status = pageTypeStatusSelector(pageType)(getState());
  if (isFetching(status) || isFetched(status)) {
    return;
  }

  dispatch(setStatus(pageType, STATUS.FETCHING));
  try {
    const pageNames = await pageTypeToAPISelector[pageType](api)();
    dispatch(setStatus(pageType, STATUS.FETCHED, pageNames));
  } catch (error) {
    if (isGraphqlError(error)) {
      dispatch(setStatus(pageType, STATUS.ERROR, null, error));
    } else {
      throw error;
    }
  }
};

export default {
  fetchPageNames,
};
