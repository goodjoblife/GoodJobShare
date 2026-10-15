import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  queryJobTitleOverview,
  queryJobTitleOverviewStatistics,
} from 'actions/jobTitle';
import CompanyAndJobTitleWrapper from 'components/CompanyAndJobTitle/CompanyAndJobTitleWrapper';
import Overview from 'components/CompanyAndJobTitle/Overview';
import { PageType, TabType } from 'constants/companyJobTitle';
import usePermission from 'hooks/usePermission';
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

import useJobTitleParam, { jobTitleSelector } from './useJobTitleParam';

// Matches the React Router route params for JobTitle pages
type Params = { jobTitle: string };

const useOverviewBox = (
  pageName: string,
): FetchBox<JobTitleOverview | null> => {
  const selector = useMemo(() => overviewBoxSelectorByName(pageName), [
    pageName,
  ]);
  return useSelector(selector);
};

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
  const jobTitle = useJobTitleParam();

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

  const overviewBox = useOverviewBox(jobTitle);
  const statisticsBox = useOverviewStatisticsBox(jobTitle);

  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={jobTitle}
      tabType={TabType.OVERVIEW}
    >
      <Overview overviewBox={overviewBox} statisticsBox={statisticsBox} />
    </CompanyAndJobTitleWrapper>
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
