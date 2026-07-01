import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  queryJobTitleOverviewStatistics,
  queryJobTitleSalaryWorkTime,
  queryJobTitleSalaryWorkTimeStatistics,
} from 'actions/jobTitle';
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
  jobTitleOverviewStatisticsBoxSelectorByName,
  jobTitleSalaryWorktimeBoxSelectorByName,
  jobTitleSalaryWorkTimeStatisticsBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import {
  pageFromQuerySelector,
  queryFromQuerySelector,
} from 'selectors/routing';

import useJobTitle, { jobTitleSelector } from './useJobTitle';

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

const useSalaryWorkTimeBoxSelector = pageName => {
  return useCallback(
    state => {
      const jobTitle = jobTitleSalaryWorktimeBoxSelectorByName(pageName)(state);
      return jobTitle;
    },
    [pageName],
  );
};

const JobTitleSalaryWorkTimeProvider = () => {
  const dispatch = useDispatch();
  const pageType = PageType.JOB_TITLE;
  const jobTitle = useJobTitle();
  const [companyName] = useSearchTextFromQuery();
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

  const boxSelector = useSalaryWorkTimeBoxSelector(jobTitle);

  const statisticsBox = useOverviewStatisticsBox(jobTitle);
  const salaryWorkTimeStatisticsBox = useSalaryWorkTimeStatisticsBox(jobTitle);

  return (
    <SalaryWorkTime
      pageType={pageType}
      pageName={jobTitle}
      page={page}
      pageSize={PAGE_SIZE}
      tabType={TabType.TIME_AND_SALARY}
      salaryWorkTimeStatisticsBox={salaryWorkTimeStatisticsBox}
      boxSelector={boxSelector}
      statisticsBox={statisticsBox}
      onCloseReport={() => handleQueryJobTitleSalaryWorkTime({ force: true })}
    />
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
  const experience = experienceFromQuerySelector(query);
  const gender = genderFromQuerySelector(query);
  const sortBy = sortByFromQuerySelector(query);
  const dataTimeRange = getDataTimeRange(dataTime);
  const experienceInYearRange = getExperienceInYearRange(experience);
  return Promise.all([
    dispatch(queryJobTitleOverviewStatistics(jobTitle)),
    dispatch(
      queryJobTitleSalaryWorkTime({
        jobTitle,
        companyName,
        start,
        limit,
        dataTimeRange,
        experienceInYearRange,
        gender: gender || undefined,
        sortBy: sortBy || undefined,
      }),
    ),
  ]);
};

export default JobTitleSalaryWorkTimeProvider;
