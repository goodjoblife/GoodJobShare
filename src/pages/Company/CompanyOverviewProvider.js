import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  queryCompanyOverview,
  queryCompanyOverviewStatistics,
  queryCompanyTopNJobTitles,
  queryRatingStatistics,
} from 'actions/company';
import { paramsSelector } from 'common/routing/selectors';
import Overview from 'components/CompanyAndJobTitle/Overview';
import { PageType, TabType } from 'constants/companyJobTitle';
import usePermission from 'hooks/usePermission';
import {
  companyOverviewBoxSelectorByName as overviewBoxSelectorByName,
  companyOverviewStatisticsBoxSelectorByName,
} from 'selectors/companyAndJobTitle';

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

const useOverviewStatisticsBox = pageName => {
  const selector = useMemo(
    () => companyOverviewStatisticsBoxSelectorByName(pageName),
    [pageName],
  );
  return useSelector(selector);
};

const CompanyOverviewProvider = () => {
  const dispatch = useDispatch();
  const pageType = PageType.COMPANY;
  const companyName = useCompanyName();

  const handleQueryCompanyOverview = useCallback(
    ({ force = false } = {}) => {
      dispatch(queryCompanyOverview(companyName, { force }));
    },
    [dispatch, companyName],
  );

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
    handleQueryCompanyOverview();
  }, [handleQueryCompanyOverview]);

  useEffect(() => {
    dispatch(queryCompanyOverviewStatistics(companyName));
  }, [dispatch, companyName]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, companyName, fetchPermission]);

  const boxSelector = useOverviewBoxSelector(companyName);
  const statisticsBox = useOverviewStatisticsBox(companyName);

  const topNJobTitles = useTopNJobTitles(companyName);

  return (
    <Overview
      pageType={pageType}
      pageName={companyName}
      tabType={TabType.OVERVIEW}
      topNJobTitles={topNJobTitles.all}
      boxSelector={boxSelector}
      statisticsBox={statisticsBox}
      onCloseReport={() => handleQueryCompanyOverview({ force: true })}
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
