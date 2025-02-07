import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InterviewExperiences from 'components/CompanyAndJobTitle/InterviewExperiences';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import {
  tabType as TAB_TYPE,
  pageType as PAGE_TYPE,
  PAGE_SIZE,
} from 'constants/companyJobTitle';
import {
  queryCompanyInterviewExperiences,
  queryCompanyTopNJobTitles,
  queryRatingStatistics,
} from 'actions/company';
import {
  interviewExperiences as interviewExperiencesSelector,
  interviewExperiencesCount as interviewExperiencesCountSelector,
  status as statusSelector,
  companyInterviewExperiencesBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import useCompanyName, { companyNameSelector } from './useCompanyName';
import { useTopNJobTitles } from './useTopNJobTitles';
import {
  searchTextFromQuerySelector,
  useSearchTextFromQuery,
} from 'components/CompanyAndJobTitle/Searchbar';
import { pageFromQuerySelector } from 'selectors/routing/page';

const useInterviewExperiencesBox = companyName => {
  const selector = useCallback(
    state => {
      const company = companyInterviewExperiencesBoxSelectorByName(companyName)(
        state,
      );
      return {
        status: statusSelector(company),
        interviewExperiences: interviewExperiencesSelector(company),
        interviewExperiencesCount: interviewExperiencesCountSelector(company),
      };
    },
    [companyName],
  );
  return useSelector(selector);
};

const CompanyInterviewExperiencesProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.COMPANY;
  const companyName = useCompanyName();
  const [jobTitle] = useSearchTextFromQuery();
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
      }),
    );
  }, [dispatch, companyName, jobTitle, start, limit]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, companyName, fetchPermission]);

  const {
    status,
    interviewExperiences,
    interviewExperiencesCount,
  } = useInterviewExperiencesBox(companyName);

  const topNJobTitles = useTopNJobTitles(companyName);

  return (
    <InterviewExperiences
      pageType={pageType}
      pageName={companyName}
      page={page}
      pageSize={PAGE_SIZE}
      totalCount={interviewExperiencesCount}
      tabType={TAB_TYPE.INTERVIEW_EXPERIENCE}
      status={status}
      interviewExperiences={interviewExperiences}
      topNJobTitles={topNJobTitles.interview}
    />
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
  const jobTitle = searchTextFromQuerySelector(query) || undefined;
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;
  return Promise.all([
    dispatch(
      queryCompanyInterviewExperiences({
        companyName,
        jobTitle,
        start,
        limit,
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
