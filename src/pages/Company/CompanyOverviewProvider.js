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
import { usePageName, pageNameSelector } from './usePageName';
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
  const pageName = usePageName();

  useEffect(() => {
    dispatch(queryRatingStatistics(pageName));
  }, [dispatch, pageName]);

  useEffect(() => {
    dispatch(
      queryCompanyTopNJobTitles({
        companyName: pageName,
      }),
    );
  }, [dispatch, pageName]);

  useEffect(() => {
    dispatch(queryCompanyOverview(pageName));
  }, [dispatch, pageName]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, pageName, fetchPermission]);

  const overviewBox = useOverviewBox(pageName);
  const topNJobTitles = useTopNJobTitles(pageName);

  return (
    <Overview
      pageType={pageType}
      pageName={pageName}
      tabType={TAB_TYPE.OVERVIEW}
      overviewBox={overviewBox}
      topNJobTitles={topNJobTitles.all}
    />
  );
};

CompanyOverviewProvider.fetchData = ({ store: { dispatch }, ...props }) => {
  const params = paramsSelector(props);
  const pageName = pageNameSelector(params);
  return Promise.all([
    dispatch(queryCompanyOverview(pageName)),
    dispatch(queryRatingStatistics(pageName)),
    dispatch(queryCompanyTopNJobTitles({ companyName: pageName })),
  ]);
};

export default CompanyOverviewProvider;
