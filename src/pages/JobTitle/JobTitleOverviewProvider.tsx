import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  queryJobTitleOverview,
  queryJobTitleOverviewStatistics,
} from 'actions/jobTitle';
import Overview from 'components/CompanyAndJobTitle/Overview';
import { PageType, TabType } from 'constants/companyJobTitle';
import usePermission from 'hooks/usePermission';
import { RootState } from 'reducers';
import {
  JobTitleOverview,
  JobTitleOverviewStatistics,
} from 'reducers/jobTitleIndex';
import {
  jobTitleOverviewBoxSelectorByName as overviewBoxSelectorByName,
  jobTitleOverviewStatisticsBoxSelectorByName as overviewStatisticsBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { ServerSideRender } from 'types/serverSideRender';
import FetchBox from 'utils/fetchBox';

import useJobTitle, { jobTitleSelector } from './useJobTitle';

// Matches the React Router route params for JobTitle pages
type Params = { jobTitle: string };

const useOverviewBoxSelector = (
  pageName: string,
): ((state: RootState) => FetchBox<JobTitleOverview | null>) =>
  useMemo(() => overviewBoxSelectorByName(pageName), [pageName]);

const useOverviewStatisticsBox = (
  pageName: string,
): FetchBox<JobTitleOverviewStatistics | null> => {
  const selector = useMemo(
    () => overviewStatisticsBoxSelectorByName(pageName),
    [pageName],
  );
  return useSelector(selector);
};

const JobTitleOverviewProvider: React.FC & ServerSideRender<Params> = () => {
  const dispatch = useDispatch();
  const pageType = PageType.JOB_TITLE;
  const jobTitle = useJobTitle();

  const handleQueryJobTitleOverview = useCallback(
    ({ force = false }: { force?: boolean } = {}) => {
      dispatch(queryJobTitleOverview(jobTitle, { force }));
    },
    [dispatch, jobTitle],
  );

  useEffect(() => {
    handleQueryJobTitleOverview();
  }, [handleQueryJobTitleOverview]);

  useEffect(() => {
    dispatch(queryJobTitleOverviewStatistics(jobTitle));
  }, [dispatch, jobTitle]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, jobTitle, fetchPermission]);

  const boxSelector = useOverviewBoxSelector(jobTitle);
  const statisticsBox = useOverviewStatisticsBox(jobTitle);

  return (
    <Overview
      pageType={pageType}
      pageName={jobTitle}
      tabType={TabType.OVERVIEW}
      boxSelector={boxSelector}
      statisticsBox={statisticsBox}
    />
  );
};

JobTitleOverviewProvider.fetchData = ({
  store: { dispatch },
  match: { params },
}): Promise<unknown> => {
  const jobTitle = jobTitleSelector(params);
  return Promise.all([
    dispatch(queryJobTitleOverview(jobTitle)),
    dispatch(queryJobTitleOverviewStatistics(jobTitle)),
  ]);
};

export default JobTitleOverviewProvider;
