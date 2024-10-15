import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InterviewExperiences from 'components/CompanyAndJobTitle/InterviewExperiences';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import { tabType, pageType as PAGE_TYPE } from 'constants/companyJobTitle';
import { queryCompanyInterviewExperiences } from 'actions/company';
import {
  interviewExperiences as interviewExperiencesSelector,
  interviewExperiencesCount as interviewExperiencesCountSelector,
  status as statusSelector,
  companyInterviewExperiencesBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { usePageName, pageNameSelector } from './usePageName';
import {
  searchTextFromQuerySelector,
  useSearchTextFromQuery,
} from 'components/CompanyAndJobTitle/Searchbar';
import { pageFromQuerySelector } from 'selectors/routing/page';

const useInterviewExperiencesBox = pageName => {
  const selector = useCallback(
    state => {
      const company = companyInterviewExperiencesBoxSelectorByName(pageName)(
        state,
      );
      return {
        status: statusSelector(company),
        interviewExperiences: interviewExperiencesSelector(company),
        interviewExperiencesCount: interviewExperiencesCountSelector(company),
      };
    },
    [pageName],
  );
  return useSelector(selector);
};

const PAGE_SIZE = 10;

const CompanyInterviewExperiencesProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.COMPANY;
  const pageName = usePageName();
  const [jobTitle] = useSearchTextFromQuery();
  const page = usePage();
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  useEffect(() => {
    dispatch(
      queryCompanyInterviewExperiences({
        companyName: pageName,
        jobTitle: jobTitle || undefined,
        start,
        limit,
      }),
    );
  }, [dispatch, pageName, jobTitle, start, limit]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, pageName, fetchPermission]);

  const {
    status,
    interviewExperiences,
    interviewExperiencesCount,
  } = useInterviewExperiencesBox(pageName);

  return (
    <InterviewExperiences
      pageType={pageType}
      pageName={pageName}
      page={page}
      pageSize={PAGE_SIZE}
      totalCount={interviewExperiencesCount}
      tabType={tabType.INTERVIEW_EXPERIENCE}
      status={status}
      interviewExperiences={interviewExperiences}
    />
  );
};

CompanyInterviewExperiencesProvider.fetchData = ({
  store: { dispatch },
  ...props
}) => {
  const params = paramsSelector(props);
  const pageName = pageNameSelector(params);
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  const jobTitle = searchTextFromQuerySelector(query) || undefined;
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;
  return dispatch(
    queryCompanyInterviewExperiences({
      companyName: pageName,
      jobTitle,
      start,
      limit,
    }),
  );
};

export default CompanyInterviewExperiencesProvider;
