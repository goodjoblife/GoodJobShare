import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Overview from 'components/CompanyAndJobTitle/Overview';
import usePermission from 'hooks/usePermission';
import {
  tabType as TAB_TYPE,
  pageType as PAGE_TYPE,
} from 'constants/companyJobTitle';
import {
  queryCompanyOverview,
  queryCompanyTopNJobTitles,
  queryRatingStatistics,
} from 'actions/company';
import {
  jobAverageSalaries,
  averageWeekWorkTime,
  overtimeFrequencyCount,
  companyOverviewBoxSelectorByName as overviewBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { paramsSelector } from 'common/routing/selectors';
import useCompanyName, { companyNameSelector } from './useCompanyName';
import { useTopNJobTitles } from './useTopNJobTitles';

const useOverviewBox = pageName => {
  const selector = useCallback(
    state => {
      const box = overviewBoxSelectorByName(pageName)(state);
      // the box.data may be null (company not found)
      return {
        status: box.status,
        data: box.data
          ? {
              ...box.data,
              // the Overview need some fileds derived from salary_work_time_statistics
              jobAverageSalaries: jobAverageSalaries(box),
              averageWeekWorkTime: averageWeekWorkTime(box),
              overtimeFrequencyCount: overtimeFrequencyCount(box),
            }
          : null,
        error: box.error,
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

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, companyName, fetchPermission]);

  const overviewBox = useOverviewBox(companyName);
  const topNJobTitles = useTopNJobTitles(companyName);

  return (
    <Overview
      pageType={pageType}
      pageName={companyName}
      tabType={TAB_TYPE.OVERVIEW}
      overviewBox={overviewBox}
      topNJobTitles={topNJobTitles.all}
      boxSelector={overviewBoxSelectorByName(companyName)}
    />
  );
};

CompanyOverviewProvider.fetchData = ({ store: { dispatch }, ...props }) => {
  const params = paramsSelector(props);
  const companyName = companyNameSelector(params);
  return Promise.all([
    dispatch(queryCompanyOverview(companyName)),
    dispatch(queryRatingStatistics(companyName)),
    dispatch(queryCompanyTopNJobTitles({ companyName })),
  ]);
};

export default CompanyOverviewProvider;
