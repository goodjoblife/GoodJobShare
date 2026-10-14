import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  queryCompanyInterviewExperiences,
  queryCompanyTopNJobTitles,
  queryRatingStatistics,
} from 'actions/company';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import CompanyAndJobTitleWrapper from 'components/CompanyAndJobTitle/CompanyAndJobTitleWrapper';
import InterviewExperiences from 'components/CompanyAndJobTitle/InterviewExperiences';
import { useSearchTextFromQuery } from 'components/CompanyAndJobTitle/SearchBar';
import {
  sortByFromQuerySelector,
  useSortByFromQuery,
} from 'components/CompanyAndJobTitle/Sorter';
import { PAGE_SIZE, PageType, TabType } from 'constants/companyJobTitle';
import { usePage } from 'hooks/routing/page';
import useBoxWithLatestExperiences from 'hooks/useBoxWithLatestExperiences';
import usePermission from 'hooks/usePermission';
import { companyInterviewExperiencesBoxSelectorByName } from 'selectors/companyAndJobTitle';
import {
  pageFromQuerySelector,
  queryFromQuerySelector,
} from 'selectors/routing';

import useCompanyNameParam, {
  companyNameSelector,
} from './useCompanyNameParam';
import { useTopNJobTitles } from './useTopNJobTitles';

const useInterviewExperiencesBox = pageName => {
  const selector = useMemo(
    () => companyInterviewExperiencesBoxSelectorByName(pageName),
    [pageName],
  );
  return useBoxWithLatestExperiences(
    useSelector(selector),
    'interviewExperiences',
  );
};

const CompanyInterviewExperiencesProvider = () => {
  const dispatch = useDispatch();
  const pageType = PageType.COMPANY;
  const companyName = useCompanyNameParam();
  const [jobTitle] = useSearchTextFromQuery();
  const [sortBy] = useSortByFromQuery();
  const page = usePage();
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  useEffect(() => {
    dispatch(queryRatingStatistics(companyName));
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(queryCompanyTopNJobTitles({ companyName }));
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(
      queryCompanyInterviewExperiences({
        companyName,
        jobTitle: jobTitle || undefined,
        start,
        limit,
        sortBy,
      }),
    );
  }, [dispatch, companyName, jobTitle, start, limit, sortBy]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, companyName, fetchPermission]);

  const interviewExperiencesBox = useInterviewExperiencesBox(companyName);

  const topNJobTitles = useTopNJobTitles(companyName);

  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={companyName}
      tabType={TabType.INTERVIEW_EXPERIENCE}
    >
      <InterviewExperiences
        page={page}
        pageSize={PAGE_SIZE}
        topNJobTitles={topNJobTitles.interview}
        interviewExperiencesBox={interviewExperiencesBox}
      />
    </CompanyAndJobTitleWrapper>
  );
};

CompanyInterviewExperiencesProvider.fetchData = ({
  store: { dispatch },
  ...props
}) => {
  const params = paramsSelector(props);
  const companyName = companyNameSelector(params);
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  const sortBy = sortByFromQuerySelector(query);
  const jobTitle = queryFromQuerySelector(query) || undefined;
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;
  return Promise.all([
    dispatch(
      queryCompanyInterviewExperiences({
        companyName,
        jobTitle,
        start,
        limit,
        sortBy,
      }),
    ),
    dispatch(queryRatingStatistics(companyName)),
    dispatch(
      queryCompanyTopNJobTitles({
        companyName,
      }),
    ),
  ]);
};

export default CompanyInterviewExperiencesProvider;
