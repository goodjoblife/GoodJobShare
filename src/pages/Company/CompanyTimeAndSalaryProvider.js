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
  queryCompanyOverviewStatistics,
  queryCompanyTimeAndSalary,
  queryCompanyTimeAndSalaryStatistics,
  queryCompanyTopNJobTitles,
  queryRatingStatistics,
} from 'actions/company';
import {
  salaryWorkTimes as salaryWorkTimesSelector,
  salaryWorkTimesCount as salaryWorkTimesCountSelector,
  salaryWorkTimeStatistics as salaryWorkTimeStatisticsSelector,
  status as statusSelector,
  companyTimeAndSalaryBoxSelectorByName as timeAndSalaryBoxSelectorByName,
  companyTimeAndSalaryStatisticsBoxSelectorByName as timeAndSalaryStatisticsBoxSelectorByName,
  jobAverageSalaries as jobAverageSalariesSelector,
  averageWeekWorkTime as averageWeekWorkTimeSelector,
  overtimeFrequencyCount as overtimeFrequencyCountSelector,
  companyOverviewStatisticsBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import useCompanyName, { companyNameSelector } from './useCompanyName';
import { useTopNJobTitles } from './useTopNJobTitles';
import { pageFromQuerySelector } from 'selectors/routing/page';
import {
  searchTextFromQuerySelector,
  useSearchTextFromQuery,
} from 'components/CompanyAndJobTitle/Searchbar';

const useOverviewStatistics = pageName => {
  const selector = useCallback(
    state => {
      const box = companyOverviewStatisticsBoxSelectorByName(pageName)(state);
      return {
        jobAverageSalaries: jobAverageSalariesSelector(box),
        averageWeekWorkTime: averageWeekWorkTimeSelector(box),
        overtimeFrequencyCount: overtimeFrequencyCountSelector(box),
      };
    },
    [pageName],
  );
  return useSelector(selector);
};

const useTimeAndSalaryStatisticsBox = pageName => {
  const selector = useCallback(
    state => {
      const company = timeAndSalaryStatisticsBoxSelectorByName(pageName)(state);
      return salaryWorkTimeStatisticsSelector(company);
    },
    [pageName],
  );
  return useSelector(selector);
};

const useTimeAndSalaryBox = companyName => {
  const selector = useCallback(
    state => {
      const company = timeAndSalaryBoxSelectorByName(companyName)(state);
      return {
        status: statusSelector(company),
        salaryWorkTimes: salaryWorkTimesSelector(company),
        salaryWorkTimesCount: salaryWorkTimesCountSelector(company),
      };
    },
    [companyName],
  );

  return useSelector(selector);
};

const CompanyTimeAndSalaryProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.COMPANY;
  const companyName = useCompanyName();
  const [jobTitle] = useSearchTextFromQuery();
  const page = usePage();
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  useEffect(() => {
    dispatch(queryRatingStatistics(companyName));
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(
      queryCompanyTimeAndSalaryStatistics({
        companyName,
      }),
    );
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(queryCompanyOverviewStatistics(companyName));
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(
      queryCompanyTopNJobTitles({
        companyName,
      }),
    );
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(
      queryCompanyTimeAndSalary({
        companyName,
        jobTitle: jobTitle || undefined,
        start,
        limit,
      }),
    );
  }, [dispatch, companyName, jobTitle, start, limit]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, companyName, fetchPermission]);

  const {
    jobAverageSalaries,
    averageWeekWorkTime,
    overtimeFrequencyCount,
  } = useOverviewStatistics(companyName);

  const salaryWorkTimeStatistics = useTimeAndSalaryStatisticsBox(companyName);
  const topNJobTitles = useTopNJobTitles(companyName);

  const { status, salaryWorkTimes, salaryWorkTimesCount } = useTimeAndSalaryBox(
    companyName,
  );

  return (
    <TimeAndSalary
      pageType={pageType}
      pageName={companyName}
      page={page}
      pageSize={PAGE_SIZE}
      totalCount={salaryWorkTimesCount}
      topNJobTitles={topNJobTitles.salary}
      tabType={TAB_TYPE.TIME_AND_SALARY}
      status={status}
      salaryWorkTimes={salaryWorkTimes}
      salaryWorkTimeStatistics={salaryWorkTimeStatistics}
      jobAverageSalaries={jobAverageSalaries}
      averageWeekWorkTime={averageWeekWorkTime}
      overtimeFrequencyCount={overtimeFrequencyCount}
    />
  );
};

CompanyTimeAndSalaryProvider.fetchData = ({
  store: { dispatch },
  ...props
}) => {
  const params = paramsSelector(props);
  const companyName = companyNameSelector(params);
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  const jobTitle = searchTextFromQuerySelector(query) || undefined;
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;
  const dispatchOverviewStatistics = dispatch(
    queryCompanyOverviewStatistics(companyName),
  );
  const dispatchTimeAndSalaryStatistics = dispatch(
    queryCompanyTimeAndSalaryStatistics({
      companyName,
    }),
  );
  const dispatchTimeAndSalary = dispatch(
    queryCompanyTimeAndSalary({
      companyName,
      jobTitle,
      start,
      limit,
    }),
  );
  const dispatchRatingStatistics = dispatch(queryRatingStatistics(companyName));
  const dispatchTopNJobTitles = dispatch(
    queryCompanyTopNJobTitles({
      companyName,
    }),
  );
  return Promise.all([
    dispatchTimeAndSalary,
    dispatchTimeAndSalaryStatistics,
    dispatchOverviewStatistics,
    dispatchRatingStatistics,
    dispatchTopNJobTitles,
  ]);
};

export default CompanyTimeAndSalaryProvider;
