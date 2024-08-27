import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InterviewExperiences from '../CompanyAndJobTitle/InterviewExperiences';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import { tabType, pageType as PAGE_TYPE } from 'constants/companyJobTitle';
import { queryJobTitleInterviewExperiences } from 'actions/jobTitle';
import {
  interviewExperiences as interviewExperiencesSelector,
  interviewExperiencesCount as interviewExperiencesCountSelector,
  status as statusSelector,
  jobTitleInterviewExperiencesBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import { usePageName, pageNameSelector } from './usePageName';
import { pageFromQuerySelector } from 'selectors/routing/page';
import {
  searchTextFromQuerySelector,
  useSearchTextFromQuery,
} from 'components/CompanyAndJobTitle/useSearchbar';

const useInterviewExperiencesBox = pageName => {
  const selector = useCallback(
    state => {
      const jobTitle = jobTitleInterviewExperiencesBoxSelectorByName(pageName)(
        state,
      );
      return {
        status: statusSelector(jobTitle),
        interviewExperiences: interviewExperiencesSelector(jobTitle),
        interviewExperiencesCount: interviewExperiencesCountSelector(jobTitle),
      };
    },
    [pageName],
  );

  return useSelector(selector);
};

const PAGE_SIZE = 10;

const JobTitleTimeAndSalaryProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.JOB_TITLE;
  const pageName = usePageName();
  const [companyName] = useSearchTextFromQuery();
  const page = usePage();
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  useEffect(() => {
    dispatch(
      queryJobTitleInterviewExperiences({
        jobTitle: pageName,
        companyName: companyName || undefined,
        start,
        limit,
      }),
    );
  }, [dispatch, pageName, companyName, start, limit]);

  const [, fetchPermission, canView] = usePermission();
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
      canView={canView}
      tabType={tabType.INTERVIEW_EXPERIENCE}
      status={status}
      interviewExperiences={interviewExperiences}
    />
  );
};

JobTitleTimeAndSalaryProvider.fetchData = ({
  store: { dispatch },
  ...props
}) => {
  const params = paramsSelector(props);
  const pageName = pageNameSelector(params);
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  const companyName = searchTextFromQuerySelector(query) || undefined;
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;
  return dispatch(
    queryJobTitleInterviewExperiences({
      jobTitle: pageName,
      companyName,
      start,
      limit,
    }),
  );
};

export default JobTitleTimeAndSalaryProvider;
