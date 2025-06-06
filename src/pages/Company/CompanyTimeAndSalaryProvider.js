import React, { useCallback, useEffect, useMemo } from 'react';
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
  queryCompanyEsgSalaryData,
  queryCompanyOverviewStatistics,
  queryCompanyTimeAndSalary,
  queryCompanyTimeAndSalaryStatistics,
  queryCompanyTopNJobTitles,
  queryRatingStatistics,
} from 'actions/company';
import {
  salaryWorkTimeStatistics as salaryWorkTimeStatisticsSelector,
  companyTimeAndSalaryBoxSelectorByName as timeAndSalaryBoxSelectorByName,
  companyTimeAndSalaryStatisticsBoxSelectorByName as timeAndSalaryStatisticsBoxSelectorByName,
  companyEsgSalaryDataBoxSelectorByName,
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

const useOverviewStatisticsBox = pageName => {
  const selector = useMemo(
    () => companyOverviewStatisticsBoxSelectorByName(pageName),
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

const useTimeAndSalaryBoxSelector = companyName => {
  return useCallback(
    state => {
      const company = timeAndSalaryBoxSelectorByName(companyName)(state);
      return company;
    },
    [companyName],
  );
};

const useEsgSalaryDataBox = companyName => {
  const selector = useCallback(
    companyEsgSalaryDataBoxSelectorByName(companyName),
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

  const handleQueryCompanyTimeAndSalary = useCallback(
    ({ force = false } = {}) => {
      dispatch(
        queryCompanyTimeAndSalary(
          {
            companyName,
            jobTitle: jobTitle || undefined,
            start,
            limit,
          },
          { force },
        ),
      );
    },
    [dispatch, companyName, jobTitle, start, limit],
  );

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
      queryCompanyEsgSalaryData({
        companyName,
      }),
    );
  }, [dispatch, companyName]);

  useEffect(() => {
    handleQueryCompanyTimeAndSalary();
  }, [handleQueryCompanyTimeAndSalary]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, companyName, fetchPermission]);

  const statisticsBox = useOverviewStatisticsBox(companyName);
  const salaryWorkTimeStatistics = useTimeAndSalaryStatisticsBox(companyName);
  const topNJobTitles = useTopNJobTitles(companyName);
  const esgSalaryDataBox = useEsgSalaryDataBox(companyName);

  const boxSelector = useTimeAndSalaryBoxSelector(companyName);

  return (
    <TimeAndSalary
      pageType={pageType}
      pageName={companyName}
      page={page}
      pageSize={PAGE_SIZE}
      topNJobTitles={topNJobTitles.salary}
      esgSalaryDataBox={esgSalaryDataBox}
      tabType={TAB_TYPE.TIME_AND_SALARY}
      salaryWorkTimeStatistics={salaryWorkTimeStatistics}
      boxSelector={boxSelector}
      statisticsBox={statisticsBox}
      onCloseReport={() => handleQueryCompanyTimeAndSalary({ force: true })}
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
  const dispatchEsgSalaryData = dispatch(
    queryCompanyEsgSalaryData({
      companyName,
    }),
  );
  return Promise.all([
    dispatchTimeAndSalary,
    dispatchTimeAndSalaryStatistics,
    dispatchOverviewStatistics,
    dispatchRatingStatistics,
    dispatchTopNJobTitles,
    dispatchEsgSalaryData,
  ]);
};

export default CompanyTimeAndSalaryProvider;
