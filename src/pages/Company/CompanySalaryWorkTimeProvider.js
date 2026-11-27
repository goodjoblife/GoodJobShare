import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  queryCompanyEsgSalaryData,
  queryCompanyOverviewStatistics,
  queryCompanySalaryWorkTime,
  queryCompanySalaryWorkTimeStatistics,
  queryCompanyTopNJobTitles,
  queryRatingStatistics,
} from 'actions/company';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import CompanyAndJobTitleWrapper from 'components/CompanyAndJobTitle/CompanyAndJobTitleWrapper';
import SalaryWorkTime from 'components/CompanyAndJobTitle/SalaryWorkTime';
import {
  dataTimeFromQuerySelector,
  experiencesFromQuerySelector,
  gendersFromQuerySelector,
  getDataTimeRange,
  getExperienceInYearRanges,
  sortByFromQuerySelector,
  useDataTimeFromQuery,
  useExperiencesFromQuery,
  useGendersFromQuery,
  useSortByFromQuery,
} from 'components/CompanyAndJobTitle/SalaryWorkTime/SalaryFilter';
import { useSearchTextFromQuery } from 'components/CompanyAndJobTitle/SearchBar';
import { PAGE_SIZE, PageType, TabType } from 'constants/companyJobTitle';
import { usePage } from 'hooks/routing/page';
import usePermission from 'hooks/usePermission';
import {
  companyEsgSalaryDataBoxSelectorByName,
  companyOverviewStatisticsBoxSelectorByName,
  companySalaryWorkTimeBoxSelectorByName,
  companySalaryWorkTimeStatisticsBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import {
  pageFromQuerySelector,
  queryFromQuerySelector,
} from 'selectors/routing';

import useCompanyNameParam, {
  companyNameSelector,
} from './useCompanyNameParam';
import { useTopNJobTitles } from './useTopNJobTitles';

const useOverviewStatisticsBox = pageName => {
  const selector = useMemo(
    () => companyOverviewStatisticsBoxSelectorByName(pageName),
    [pageName],
  );
  return useSelector(selector);
};

const useSalaryWorkTimeStatisticsBox = pageName => {
  const selector = useMemo(
    () => companySalaryWorkTimeStatisticsBoxSelectorByName(pageName),
    [pageName],
  );
  return useSelector(selector);
};

const useSalaryWorkTimeBox = companyName => {
  const selector = useMemo(
    () => companySalaryWorkTimeBoxSelectorByName(companyName),
    [companyName],
  );
  return useSelector(selector);
};

const useEsgSalaryDataBox = companyName => {
  const selector = useCallback(
    companyEsgSalaryDataBoxSelectorByName(companyName),
    [companyName],
  );

  return useSelector(selector);
};

const CompanySalaryWorkTimeProvider = () => {
  const dispatch = useDispatch();
  const pageType = PageType.COMPANY;
  const companyName = useCompanyNameParam();
  const [jobTitle] = useSearchTextFromQuery();
  const page = usePage();
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  const dataTime = useDataTimeFromQuery();
  const experiences = useExperiencesFromQuery();
  const genders = useGendersFromQuery();
  const [sortBy] = useSortByFromQuery();

  const dataTimeRange = useMemo(() => getDataTimeRange(dataTime), [dataTime]);
  const experienceInYearRanges = useMemo(
    () => getExperienceInYearRanges(experiences),
    [experiences],
  );

  const handleQueryCompanySalaryWorkTime = useCallback(
    ({ force = false } = {}) => {
      dispatch(
        queryCompanySalaryWorkTime(
          {
            companyName,
            jobTitle: jobTitle || undefined,
            start,
            limit,
            dataTimeRange,
            experienceInYearRanges,
            genders: genders.length > 0 ? genders : undefined,
            sortBy: sortBy || undefined,
          },
          { force },
        ),
      );
    },
    [
      dispatch,
      companyName,
      jobTitle,
      start,
      limit,
      dataTimeRange,
      experienceInYearRanges,
      genders,
      sortBy,
    ],
  );

  useEffect(() => {
    dispatch(queryRatingStatistics(companyName));
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(
      queryCompanySalaryWorkTimeStatistics({
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
    handleQueryCompanySalaryWorkTime();
  }, [handleQueryCompanySalaryWorkTime]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, companyName, fetchPermission]);

  const statisticsBox = useOverviewStatisticsBox(companyName);
  const salaryWorkTimeStatisticsBox = useSalaryWorkTimeStatisticsBox(
    companyName,
  );
  const topNJobTitles = useTopNJobTitles(companyName);
  const esgSalaryDataBox = useEsgSalaryDataBox(companyName);

  const salaryWorkTimeBox = useSalaryWorkTimeBox(companyName);

  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={companyName}
      tabType={TabType.TIME_AND_SALARY}
    >
      <SalaryWorkTime
        page={page}
        pageSize={PAGE_SIZE}
        topNJobTitles={topNJobTitles.salary}
        esgSalaryDataBox={esgSalaryDataBox}
        salaryWorkTimeStatisticsBox={salaryWorkTimeStatisticsBox}
        salaryWorkTimeBox={salaryWorkTimeBox}
        statisticsBox={statisticsBox}
        onCloseReport={() => handleQueryCompanySalaryWorkTime({ force: true })}
      />
    </CompanyAndJobTitleWrapper>
  );
};

CompanySalaryWorkTimeProvider.fetchData = ({
  store: { dispatch },
  ...props
}) => {
  const params = paramsSelector(props);
  const companyName = companyNameSelector(params);
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  const jobTitle = queryFromQuerySelector(query) || undefined;
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;
  const dataTime = dataTimeFromQuerySelector(query);
  const experiences = experiencesFromQuerySelector(query);
  const genders = gendersFromQuerySelector(query);
  const sortBy = sortByFromQuerySelector(query);
  const dataTimeRange = getDataTimeRange(dataTime);
  const experienceInYearRanges = getExperienceInYearRanges(experiences);
  return Promise.all([
    dispatch(
      queryCompanySalaryWorkTime({
        companyName,
        jobTitle,
        start,
        limit,
        dataTimeRange,
        experienceInYearRanges,
        genders: genders.length > 0 ? genders : undefined,
        sortBy: sortBy || undefined,
      }),
    ),
    dispatch(
      queryCompanySalaryWorkTimeStatistics({
        companyName,
      }),
    ),
    dispatch(queryCompanyOverviewStatistics(companyName)),
    dispatch(queryRatingStatistics(companyName)),
    dispatch(
      queryCompanyTopNJobTitles({
        companyName,
      }),
    ),
    dispatch(
      queryCompanyEsgSalaryData({
        companyName,
      }),
    ),
  ]);
};

export default CompanySalaryWorkTimeProvider;
