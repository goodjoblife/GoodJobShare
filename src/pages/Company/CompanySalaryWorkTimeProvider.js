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
import SalaryWorkTime from 'components/CompanyAndJobTitle/SalaryWorkTime';
import {
  dataTimeFromQuerySelector,
  experienceFromQuerySelector,
  genderFromQuerySelector,
  getDataTimeRange,
  getExperienceInYearRange,
  sortByFromQuerySelector,
  useDataTimeFromQuery,
  useExperienceFromQuery,
  useGenderFromQuery,
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
  salaryWorkTimeStatistics as salaryWorkTimeStatisticsSelector,
} from 'selectors/companyAndJobTitle';
import {
  pageFromQuerySelector,
  queryFromQuerySelector,
} from 'selectors/routing';

import useCompanyName, { companyNameSelector } from './useCompanyName';
import { useTopNJobTitles } from './useTopNJobTitles';

const useOverviewStatisticsBox = pageName => {
  const selector = useMemo(
    () => companyOverviewStatisticsBoxSelectorByName(pageName),
    [pageName],
  );
  return useSelector(selector);
};

const useSalaryWorkTimeStatisticsBox = pageName => {
  const selector = useCallback(
    state => {
      const company = companySalaryWorkTimeStatisticsBoxSelectorByName(
        pageName,
      )(state);
      return salaryWorkTimeStatisticsSelector(company);
    },
    [pageName],
  );
  return useSelector(selector);
};

const useSalaryWorkTimeBoxSelector = companyName => {
  return useCallback(
    state => {
      const company = companySalaryWorkTimeBoxSelectorByName(companyName)(
        state,
      );
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

const CompanySalaryWorkTimeProvider = () => {
  const dispatch = useDispatch();
  const pageType = PageType.COMPANY;
  const companyName = useCompanyName();
  const [jobTitle] = useSearchTextFromQuery();
  const page = usePage();
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  const [dataTime] = useDataTimeFromQuery();
  const [experience] = useExperienceFromQuery();
  const [gender] = useGenderFromQuery();
  const [sortBy] = useSortByFromQuery();

  const dataTimeRange = useMemo(() => getDataTimeRange(dataTime), [dataTime]);
  const experienceInYearRange = useMemo(
    () => getExperienceInYearRange(experience),
    [experience],
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
            experienceInYearRange,
            gender: gender || undefined,
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
      experienceInYearRange,
      gender,
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
  const salaryWorkTimeStatistics = useSalaryWorkTimeStatisticsBox(companyName);
  const topNJobTitles = useTopNJobTitles(companyName);
  const esgSalaryDataBox = useEsgSalaryDataBox(companyName);

  const boxSelector = useSalaryWorkTimeBoxSelector(companyName);

  return (
    <SalaryWorkTime
      pageType={pageType}
      pageName={companyName}
      page={page}
      pageSize={PAGE_SIZE}
      topNJobTitles={topNJobTitles.salary}
      esgSalaryDataBox={esgSalaryDataBox}
      tabType={TabType.TIME_AND_SALARY}
      salaryWorkTimeStatistics={salaryWorkTimeStatistics}
      boxSelector={boxSelector}
      statisticsBox={statisticsBox}
      onCloseReport={() => handleQueryCompanySalaryWorkTime({ force: true })}
    />
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
  const experience = experienceFromQuerySelector(query);
  const gender = genderFromQuerySelector(query);
  const sortBy = sortByFromQuerySelector(query);
  const dataTimeRange = getDataTimeRange(dataTime);
  const experienceInYearRange = getExperienceInYearRange(experience);
  return Promise.all([
    dispatch(
      queryCompanySalaryWorkTime({
        companyName,
        jobTitle,
        start,
        limit,
        dataTimeRange,
        experienceInYearRange,
        gender: gender || undefined,
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
