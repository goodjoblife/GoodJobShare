import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TimeAndSalary from 'components/CompanyAndJobTitle/TimeAndSalary';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import {
  tabType as TAB_TYPE,
  pageType as PAGE_TYPE,
  PAGE_SIZE,
} from 'constants/companyJobTitle';
import {
  queryJobTitleOverviewStatistics,
  queryJobTitleTimeAndSalary,
  queryJobTitleTimeAndSalaryStatistics,
} from 'actions/jobTitle';
import {
  jobTitleTimeAndSalaryBoxSelectorByName as timeAndSalaryBoxSelectorByName,
  jobTitleTimeAndSalaryStatisticsBoxSelectorByName as timeAndSalaryStatisticsBoxSelectorByName,
  jobTitleOverviewStatisticsBoxSelectorByName as overviewStatisticsBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import useJobTitle, { jobTitleSelector } from './useJobTitle';
import { pageFromQuerySelector } from 'selectors/routing/page';
import {
  searchTextFromQuerySelector,
  useSearchTextFromQuery,
} from 'components/CompanyAndJobTitle/Searchbar';

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

const useSalaryWorkTimeStatistics = pageName => {
  const selector = useCallback(
    state => {
      const jobTitle = timeAndSalaryStatisticsBoxSelectorByName(pageName)(
        state,
      );
      return {
        salaryDistribution: jobTitle.data && jobTitle.data.salaryDistribution,
        averageWeekWorkTime: jobTitle.data && jobTitle.data.averageWeekWorkTime,
        overtimeFrequencyCount:
          jobTitle.data && jobTitle.data.overtimeFrequencyCount,
      };
    },
    [pageName],
  );

  return useSelector(selector);
};

const useTimeAndSalaryBoxSelector = pageName => {
  return useCallback(
    state => {
      const jobTitle = timeAndSalaryBoxSelectorByName(pageName)(state);
      return jobTitle;
    },
    [pageName],
  );
};

const JobTitleTimeAndSalaryProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.JOB_TITLE;
  const jobTitle = useJobTitle();
  const [companyName] = useSearchTextFromQuery();
  const page = usePage();
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  useEffect(() => {
    dispatch(queryJobTitleOverviewStatistics(jobTitle));
  }, [dispatch, jobTitle]);

  useEffect(() => {
    dispatch(
      queryJobTitleTimeAndSalaryStatistics({
        jobTitle,
      }),
    );
  }, [dispatch, jobTitle]);

  useEffect(() => {
    dispatch(
      queryJobTitleTimeAndSalary({
        jobTitle,
        companyName: companyName || undefined,
        start,
        limit,
      }),
    );
  }, [dispatch, jobTitle, companyName, start, limit]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, jobTitle, fetchPermission]);

  const boxSelector = useTimeAndSalaryBoxSelector(jobTitle);

  const {
    salaryDistribution,
    averageWeekWorkTime,
    overtimeFrequencyCount,
  } = useOverviewStatistics(jobTitle);

  const salaryWorkTimeStatistics = useSalaryWorkTimeStatistics(jobTitle);

  return (
    <TimeAndSalary
      pageType={pageType}
      pageName={jobTitle}
      page={page}
      pageSize={PAGE_SIZE}
      tabType={TAB_TYPE.TIME_AND_SALARY}
      salaryWorkTimeStatistics={salaryWorkTimeStatistics}
      salaryDistribution={salaryDistribution}
      averageWeekWorkTime={averageWeekWorkTime}
      overtimeFrequencyCount={overtimeFrequencyCount}
      boxSelector={boxSelector}
    />
  );
};

JobTitleTimeAndSalaryProvider.fetchData = ({
  store: { dispatch },
  ...props
}) => {
  const params = paramsSelector(props);
  const jobTitle = jobTitleSelector(params);
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  const companyName = searchTextFromQuerySelector(query) || undefined;
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;
  return Promise.all([
    dispatch(queryJobTitleOverviewStatistics(jobTitle)),
    dispatch(
      queryJobTitleTimeAndSalary({
        jobTitle,
        companyName,
        start,
        limit,
      }),
    ),
  ]);
};

export default JobTitleTimeAndSalaryProvider;
