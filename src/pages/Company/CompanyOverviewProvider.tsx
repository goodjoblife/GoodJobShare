import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Overview from 'components/CompanyAndJobTitle/Overview';
import usePermission from 'hooks/usePermission';
import { TabType, PageType } from 'constants/companyJobTitle';
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
import { RootState } from 'reducers';
import {
  CompanyOverview,
  CompanyOverviewStatistics,
} from 'reducers/companyIndex';
import FetchBox from 'utils/fetchBox';
import { ServerSideRender } from 'types/serverSideRender';
import useCompanyName, { companyNameSelector } from './useCompanyName';

type Params = { companyName: string };

const useOverviewBoxSelector = (
  pageName: string,
): ((state: RootState) => FetchBox<CompanyOverview | null>) =>
  useMemo(() => overviewBoxSelectorByName(pageName), [pageName]);

const useOverviewStatisticsBox = (
  pageName: string,
): FetchBox<CompanyOverviewStatistics | null> => {
  const selector = useMemo(
    () => companyOverviewStatisticsBoxSelectorByName(pageName),
    [pageName],
  );
  return useSelector(selector);
};

const CompanyOverviewProvider: React.FC & ServerSideRender<Params> = () => {
  const dispatch = useDispatch();
  const pageType = PageType.COMPANY;
  const companyName = useCompanyName();

  const handleQueryCompanyOverview = useCallback(
    ({ force = false }: { force?: boolean } = {}) => {
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

  return (
    <Overview
      pageType={pageType}
      pageName={companyName}
      tabType={TabType.OVERVIEW}
      boxSelector={boxSelector}
      statisticsBox={statisticsBox}
      onCloseReport={(): void => handleQueryCompanyOverview({ force: true })}
    />
  );
};

CompanyOverviewProvider.fetchData = ({
  store: { dispatch },
  match: { params },
}): Promise<unknown> => {
  const companyName = companyNameSelector(params);
  return Promise.all([
    dispatch(queryCompanyOverview(companyName)),
    dispatch(queryCompanyOverviewStatistics(companyName)),
    dispatch(queryRatingStatistics(companyName)),
    // helmet use
    dispatch(queryCompanyTopNJobTitles({ companyName })),
  ]);
};

export default CompanyOverviewProvider;
