import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  salaryDistribution,
  averageWeekWorkTime,
  overtimeFrequencyCount,
  jobTitleOverviewBoxSelectorByName as overviewBoxSelectorByName,
  jobTitleOverviewStatisticsBoxSelectorByName as overviewStatisticsBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { paramsSelector } from 'common/routing/selectors';
import useJobTitle, { jobTitleSelector } from './useJobTitle';

const useOverviewBox = pageName => {
  const selector = useCallback(
    state => {
      const box = overviewBoxSelectorByName(pageName)(state);
      // the box.data may be null (company not found)
      return box;
    },
    [pageName],
  );
  return useSelector(selector);
};

const useOverviewStatistics = pageName => {
  const selector = useCallback(
    state => {
      const box = overviewStatisticsBoxSelectorByName(pageName)(state);
      // the box.data may be null (company not found)
      return {
        salaryDistribution: salaryDistribution(box),
        averageWeekWorkTime: averageWeekWorkTime(box),
        overtimeFrequencyCount: overtimeFrequencyCount(box),
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

  const overviewBox = useOverviewBox(jobTitle);
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
      overviewBox={overviewBox}
      salaryDistribution={salaryDistribution}
      averageWeekWorkTime={averageWeekWorkTime}
      overtimeFrequencyCount={overtimeFrequencyCount}
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
