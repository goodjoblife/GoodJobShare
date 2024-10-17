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
  queryJobTitleTimeAndSalary,
  queryJobTitleTimeAndSalaryStatistics,
} from 'actions/jobTitle';
import {
  salaryWorkTimes as salaryWorkTimesSelector,
  salaryWorkTimesCount as salaryWorkTimesCountSelector,
  salaryWorkTimeStatistics as salaryWorkTimeStatisticsSelector,
  status as statusSelector,
  jobTitleTimeAndSalaryBoxSelectorByName as timeAndSalaryBoxSelectorByName,
  jobTitleTimeAndSalaryStatisticsBoxSelectorByName as timeAndSalaryStatisticsBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import { usePageName, pageNameSelector } from './usePageName';
import { pageFromQuerySelector } from 'selectors/routing/page';
import {
  searchTextFromQuerySelector,
  useSearchTextFromQuery,
} from 'components/CompanyAndJobTitle/Searchbar';

const useSalaryWorkTimeStatistics = pageName => {
  const selector = useCallback(
    state => {
      const jobTitle = timeAndSalaryStatisticsBoxSelectorByName(pageName)(
        state,
      );
      return salaryWorkTimeStatisticsSelector(jobTitle);
    },
    [pageName],
  );

  return useSelector(selector);
};

const useTimeAndSalaryBox = pageName => {
  const selector = useCallback(
    state => {
      const jobTitle = timeAndSalaryBoxSelectorByName(pageName)(state);
      return {
        status: statusSelector(jobTitle),
        salaryWorkTimes: salaryWorkTimesSelector(jobTitle),
        salaryWorkTimesCount: salaryWorkTimesCountSelector(jobTitle),
      };
    },
    [pageName],
  );

  return useSelector(selector);
};

const JobTitleTimeAndSalaryProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.JOB_TITLE;
  const pageName = usePageName();
  const [companyName] = useSearchTextFromQuery();
  const page = usePage();
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  useEffect(() => {
    dispatch(
      queryJobTitleTimeAndSalaryStatistics({
        jobTitle: pageName,
      }),
    );
  }, [dispatch, pageName]);

  useEffect(() => {
    dispatch(
      queryJobTitleTimeAndSalary({
        jobTitle: pageName,
        companyName: companyName || undefined,
        start,
        limit,
      }),
    );
  }, [dispatch, pageName, companyName, start, limit]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, pageName, fetchPermission]);

  const { status, salaryWorkTimes, salaryWorkTimesCount } = useTimeAndSalaryBox(
    pageName,
  );

  const salaryWorkTimeStatistics = useSalaryWorkTimeStatistics(pageName);

  return (
    <TimeAndSalary
      pageType={pageType}
      pageName={pageName}
      page={page}
      pageSize={PAGE_SIZE}
      totalCount={salaryWorkTimesCount}
      tabType={TAB_TYPE.TIME_AND_SALARY}
      status={status}
      salaryWorkTimes={salaryWorkTimes}
      salaryWorkTimeStatistics={salaryWorkTimeStatistics}
    />
  );
};

JobTitleTimeAndSalaryProvider.fetchData = ({
  store: { dispatch },
  ...props
}) => {
  const params = paramsSelector(props);
  const pageName = pageNameSelector(params);
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  const companyName = searchTextFromQuerySelector(query) || undefined;
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;
  return dispatch(
    queryJobTitleTimeAndSalary({
      jobTitle: pageName,
      companyName,
      start,
      limit,
    }),
  );
};

export default JobTitleTimeAndSalaryProvider;
