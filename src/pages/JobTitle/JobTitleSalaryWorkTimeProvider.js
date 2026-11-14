import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  queryJobTitleOverviewStatistics,
  queryJobTitleSalaryWorkTime,
  queryJobTitleSalaryWorkTimeStatistics,
} from 'actions/jobTitle';
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
  jobTitleOverviewStatisticsBoxSelectorByName,
  jobTitleSalaryWorktimeBoxSelectorByName,
  jobTitleSalaryWorkTimeStatisticsBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import {
  pageFromQuerySelector,
  queryFromQuerySelector,
} from 'selectors/routing';

import useJobTitleParam, { jobTitleSelector } from './useJobTitleParam';

const useOverviewStatisticsBox = pageName => {
  const selector = useMemo(
    () => jobTitleOverviewStatisticsBoxSelectorByName(pageName),
    [pageName],
  );
  return useSelector(selector);
};

const useSalaryWorkTimeStatisticsBox = pageName => {
  const selector = useMemo(
    () => jobTitleSalaryWorkTimeStatisticsBoxSelectorByName(pageName),
    [pageName],
  );
  return useSelector(selector);
};

const useSalaryWorkTimeBox = pageName => {
  const selector = useMemo(
    () => jobTitleSalaryWorktimeBoxSelectorByName(pageName),
    [pageName],
  );
  return useSelector(selector);
};

const JobTitleSalaryWorkTimeProvider = () => {
  const dispatch = useDispatch();
  const pageType = PageType.JOB_TITLE;
  const jobTitle = useJobTitleParam();
  const [companyName] = useSearchTextFromQuery();
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

  const handleQueryJobTitleSalaryWorkTime = useCallback(
    ({ force = false } = {}) => {
      dispatch(
        queryJobTitleSalaryWorkTime(
          {
            jobTitle,
            companyName: companyName || undefined,
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
    dispatch(queryJobTitleOverviewStatistics(jobTitle));
  }, [dispatch, jobTitle]);

  useEffect(() => {
    dispatch(
      queryJobTitleSalaryWorkTimeStatistics({
        jobTitle,
      }),
    );
  }, [dispatch, jobTitle]);

  useEffect(() => {
    handleQueryJobTitleSalaryWorkTime();
  }, [handleQueryJobTitleSalaryWorkTime]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, jobTitle, fetchPermission]);

  const salaryWorkTimeBox = useSalaryWorkTimeBox(jobTitle);

  const statisticsBox = useOverviewStatisticsBox(jobTitle);
  const salaryWorkTimeStatisticsBox = useSalaryWorkTimeStatisticsBox(jobTitle);

  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={jobTitle}
      tabType={TabType.TIME_AND_SALARY}
    >
      <SalaryWorkTime
        page={page}
        pageSize={PAGE_SIZE}
        salaryWorkTimeStatisticsBox={salaryWorkTimeStatisticsBox}
        salaryWorkTimeBox={salaryWorkTimeBox}
        statisticsBox={statisticsBox}
        onCloseReport={() => handleQueryJobTitleSalaryWorkTime({ force: true })}
      />
    </CompanyAndJobTitleWrapper>
  );
};

JobTitleSalaryWorkTimeProvider.fetchData = ({
  store: { dispatch },
  ...props
}) => {
  const params = paramsSelector(props);
  const jobTitle = jobTitleSelector(params);
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  const companyName = queryFromQuerySelector(query) || undefined;
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;
  const dataTime = dataTimeFromQuerySelector(query);
  const experiences = experiencesFromQuerySelector(query);
  const genders = gendersFromQuerySelector(query);
  const sortBy = sortByFromQuerySelector(query);
  const dataTimeRange = getDataTimeRange(dataTime);
  const experienceInYearRanges = getExperienceInYearRanges(experiences);
  return Promise.all([
    dispatch(queryJobTitleOverviewStatistics(jobTitle)),
    dispatch(
      queryJobTitleSalaryWorkTime({
        jobTitle,
        companyName,
        start,
        limit,
        dataTimeRange,
        experienceInYearRanges,
        genders: genders.length > 0 ? genders : undefined,
        sortBy: sortBy || undefined,
      }),
    ),
  ]);
};

export default JobTitleSalaryWorkTimeProvider;
