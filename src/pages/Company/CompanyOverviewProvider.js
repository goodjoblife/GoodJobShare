import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Overview from 'components/CompanyAndJobTitle/Overview';
import usePermission from 'hooks/usePermission';
import {
  tabType as TAB_TYPE,
  pageType as PAGE_TYPE,
} from 'constants/companyJobTitle';
import {
  queryCompanyOverview,
  queryCompanyOverviewStatistics,
  queryCompanyTopNJobTitles,
  queryRatingStatistics,
} from 'actions/company';
import {
  companyOverviewBoxSelectorByName as overviewBoxSelectorByName,
  companyOverviewStatisticsBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { paramsSelector } from 'common/routing/selectors';
import useCompanyName, { companyNameSelector } from './useCompanyName';
import { useTopNJobTitles } from './useTopNJobTitles';

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
      const box = companyOverviewStatisticsBoxSelectorByName(pageName)(state);
      return {
        jobAverageSalaries: (box.data && box.data.jobAverageSalaries) || [],
        averageWeekWorkTime: (box.data && box.data.averageWeekWorkTime) || 0,
        overtimeFrequencyCount:
          (box.data && box.data.overtimeFrequencyCount) || 0,
      };
    },
    [pageName],
  );
  return useSelector(selector);
};

const CompanyOverviewProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.COMPANY;
  const companyName = useCompanyName();

  useEffect(() => {
    dispatch(queryRatingStatistics(companyName));
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(
      queryCompanyTopNJobTitles({
        companyName,
      }),
    );
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(queryCompanyOverview(companyName));
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(queryCompanyOverviewStatistics(companyName));
  }, [dispatch, companyName]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, companyName, fetchPermission]);

  const {
    jobAverageSalaries,
    averageWeekWorkTime,
    overtimeFrequencyCount,
  } = useOverviewStatistics(companyName);

  const boxSelector = useOverviewBoxSelector(companyName);
  const topNJobTitles = useTopNJobTitles(companyName);

  return (
    <Overview
      pageType={pageType}
      pageName={companyName}
      tabType={TAB_TYPE.OVERVIEW}
      jobAverageSalaries={jobAverageSalaries}
      averageWeekWorkTime={averageWeekWorkTime}
      overtimeFrequencyCount={overtimeFrequencyCount}
      topNJobTitles={topNJobTitles.all}
      boxSelector={boxSelector}
    />
  );
};

CompanyOverviewProvider.fetchData = ({ store: { dispatch }, ...props }) => {
  const params = paramsSelector(props);
  const companyName = companyNameSelector(params);
  return Promise.all([
    dispatch(queryCompanyOverview(companyName)),
    dispatch(queryCompanyOverviewStatistics(companyName)),
    dispatch(queryRatingStatistics(companyName)),
    dispatch(queryCompanyTopNJobTitles({ companyName })),
  ]);
};

export default CompanyOverviewProvider;
