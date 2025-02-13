import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Overview from 'components/CompanyAndJobTitle/Overview';
import usePermission from 'hooks/usePermission';
import {
  tabType as TAB_TYPE,
  pageType as PAGE_TYPE,
} from 'constants/companyJobTitle';
import {
  queryJobTitleOverview,
  queryJobTitleOverviewStatistics,
} from 'actions/jobTitle';
import {
  jobTitleOverviewBoxSelectorByName as overviewBoxSelectorByName,
  jobTitleOverviewStatisticsBoxSelectorByName as overviewStatisticsBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
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

const useOverviewStatistics = pageName => {
  const selector = useCallback(
    state => {
      const box = overviewStatisticsBoxSelectorByName(pageName)(state);
      return {
        salaryDistribution: (box.data && box.data.salaryDistribution) || [],
        averageWeekWorkTime: (box.data && box.data.averageWeekWorkTime) || 0,
        overtimeFrequencyCount:
          (box.data && box.data.overtimeFrequencyCount) || 0,
      };
    },
    [pageName],
  );
  return useSelector(selector);
};

const JobTitleOverviewProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.JOB_TITLE;
  const jobTitle = useJobTitle();

  useEffect(() => {
    dispatch(queryJobTitleOverview(jobTitle));
  }, [dispatch, jobTitle]);

  useEffect(() => {
    dispatch(queryJobTitleOverviewStatistics(jobTitle));
  }, [dispatch, jobTitle]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, jobTitle, fetchPermission]);

  const boxSelector = useOverviewBoxSelector(jobTitle);
  const {
    salaryDistribution,
    averageWeekWorkTime,
    overtimeFrequencyCount,
  } = useOverviewStatistics(jobTitle);

  return (
    <Overview
      pageType={pageType}
      pageName={jobTitle}
      tabType={TAB_TYPE.OVERVIEW}
      salaryDistribution={salaryDistribution}
      averageWeekWorkTime={averageWeekWorkTime}
      overtimeFrequencyCount={overtimeFrequencyCount}
      boxSelector={boxSelector}
    />
  );
};

JobTitleOverviewProvider.fetchData = ({ store: { dispatch }, ...props }) => {
  const params = paramsSelector(props);
  const jobTitle = jobTitleSelector(params);
  return Promise.all([
    dispatch(queryJobTitleOverview(jobTitle)),
    dispatch(queryJobTitleOverviewStatistics(jobTitle)),
  ]);
};

export default JobTitleOverviewProvider;
