import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TimeAndSalary from 'components/CompanyAndJobTitle/TimeAndSalary';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import { tabType, pageType as PAGE_TYPE } from 'constants/companyJobTitle';
import {
  queryCompanyTimeAndSalary,
  queryCompanyTimeAndSalaryStatistics,
  queryRatingStatistics,
} from 'actions/company';
import {
  salaryWorkTimes as salaryWorkTimesSelector,
  salaryWorkTimesCount as salaryWorkTimesCountSelector,
  salaryWorkTimeStatistics as salaryWorkTimeStatisticsSelector,
  status as statusSelector,
  companyTimeAndSalaryBoxSelectorByName as timeAndSalaryBoxSelectorByName,
  companyTimeAndSalaryStatisticsBoxSelectorByName as timeAndSalaryStatisticsBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import { usePageName, pageNameSelector } from './usePageName';
import { pageFromQuerySelector } from 'selectors/routing/page';
import {
  searchTextFromQuerySelector,
  useSearchTextFromQuery,
} from 'components/CompanyAndJobTitle/Searchbar';

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

const useTimeAndSalaryBox = pageName => {
  const selector = useCallback(
    state => {
      const company = timeAndSalaryBoxSelectorByName(pageName)(state);
      return {
        status: statusSelector(company),
        salaryWorkTimes: salaryWorkTimesSelector(company),
        salaryWorkTimesCount: salaryWorkTimesCountSelector(company),
      };
    },
    [pageName],
  );

  return useSelector(selector);
};

const PAGE_SIZE = 10;

const CompanyTimeAndSalaryProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.COMPANY;
  const pageName = usePageName();
  const [jobTitle] = useSearchTextFromQuery();
  const page = usePage();
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  useEffect(() => {
    dispatch(queryRatingStatistics(pageName));
  }, [dispatch, pageName]);

  useEffect(() => {
    dispatch(
      queryCompanyTimeAndSalaryStatistics({
        companyName: pageName,
      }),
    );
  }, [dispatch, pageName]);

  useEffect(() => {
    dispatch(
      queryCompanyTimeAndSalary({
        companyName: pageName,
        jobTitle: jobTitle || undefined,
        start,
        limit,
      }),
    );
  }, [dispatch, pageName, jobTitle, start, limit]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, pageName, fetchPermission]);

  const salaryWorkTimeStatistics = useTimeAndSalaryStatisticsBox(pageName);

  const { status, salaryWorkTimes, salaryWorkTimesCount } = useTimeAndSalaryBox(
    pageName,
  );

  return (
    <TimeAndSalary
      pageType={pageType}
      pageName={pageName}
      page={page}
      pageSize={PAGE_SIZE}
      totalCount={salaryWorkTimesCount}
      tabType={tabType.TIME_AND_SALARY}
      status={status}
      salaryWorkTimes={salaryWorkTimes}
      salaryWorkTimeStatistics={salaryWorkTimeStatistics}
    />
  );
};

CompanyTimeAndSalaryProvider.fetchData = ({
  store: { dispatch },
  ...props
}) => {
  const params = paramsSelector(props);
  const pageName = pageNameSelector(params);
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  const jobTitle = searchTextFromQuerySelector(query) || undefined;
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;
  const dispatchTimeAndSalaryStatistics = dispatch(
    queryCompanyTimeAndSalaryStatistics({
      companyName: pageName,
    }),
  );
  const dispatchTimeAndSalary = dispatch(
    queryCompanyTimeAndSalary({
      companyName: pageName,
      jobTitle,
      start,
      limit,
    }),
  );
  const dispatchRatingStatistics = dispatch(queryRatingStatistics(pageName));
  return Promise.all([
    dispatchTimeAndSalary,
    dispatchTimeAndSalaryStatistics,
    dispatchRatingStatistics,
  ]);
};

export default CompanyTimeAndSalaryProvider;
