import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Overview from 'components/CompanyAndJobTitle/Overview';
import usePermission from 'hooks/usePermission';
import {
  tabType as TAB_TYPE,
  pageType as PAGE_TYPE,
} from 'constants/companyJobTitle';
import { queryJobTitleOverview } from 'actions/jobTitle';
import { jobTitleOverviewBoxSelectorByName as overviewBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { paramsSelector } from 'common/routing/selectors';
import useJobTitle, { jobTitleSelector } from './useJobTitle';

const useOverviewBoxSelector = pageName => {
  return useCallback(
    state => {
      const box = overviewBoxSelectorByName(pageName)(state);
      return box;
    },
    [pageName],
  );
};

const JobTitleOverviewProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.JOB_TITLE;
  const jobTitle = useJobTitle();

  useEffect(() => {
    dispatch(queryJobTitleOverview(jobTitle));
  }, [dispatch, jobTitle]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, jobTitle, fetchPermission]);

  const boxSelector = useOverviewBoxSelector(jobTitle);

  return (
    <Overview
      pageType={pageType}
      pageName={jobTitle}
      tabType={TAB_TYPE.OVERVIEW}
      boxSelector={boxSelector}
    />
  );
};

JobTitleOverviewProvider.fetchData = ({ store: { dispatch }, ...props }) => {
  const params = paramsSelector(props);
  const jobTitle = jobTitleSelector(params);
  return dispatch(queryJobTitleOverview(jobTitle));
};

export default JobTitleOverviewProvider;
