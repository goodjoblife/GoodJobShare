import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InterviewExperiences from 'components/CompanyAndJobTitle/InterviewExperiences';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import {
  tabType as TAB_TYPE,
  pageType as PAGE_TYPE,
  PAGE_SIZE,
} from 'constants/companyJobTitle';
import { queryJobTitleInterviewExperiences } from 'actions/jobTitle';
import {
  interviewExperiences as interviewExperiencesSelector,
  interviewExperiencesCount as interviewExperiencesCountSelector,
  status as statusSelector,
  jobTitleInterviewExperiencesBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import useJobTitle, { jobTitleSelector } from './useJobTitle';
import { pageFromQuerySelector } from 'selectors/routing/page';
import {
  searchTextFromQuerySelector,
  useSearchTextFromQuery,
} from 'components/CompanyAndJobTitle/Searchbar';

const useInterviewExperiencesBox = jobTitle => {
  const selector = useCallback(
    state => {
      const job = jobTitleInterviewExperiencesBoxSelectorByName(jobTitle)(
        state,
      );
      return {
        status: statusSelector(job),
        interviewExperiences: interviewExperiencesSelector(job),
        interviewExperiencesCount: interviewExperiencesCountSelector(job),
      };
    },
    [jobTitle],
  );

  return useSelector(selector);
};

const JobTitleTimeAndSalaryProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.JOB_TITLE;
  const jobTitle = useJobTitle();
  const [companyName] = useSearchTextFromQuery();
  const page = usePage();
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  useEffect(() => {
    dispatch(
      queryJobTitleInterviewExperiences({
        jobTitle,
        companyName: companyName || undefined,
        start,
        limit,
      }),
    );
  }, [dispatch, jobTitle, companyName, start, limit]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, jobTitle, fetchPermission]);

  const {
    status,
    interviewExperiences,
    interviewExperiencesCount,
  } = useInterviewExperiencesBox(jobTitle);

  return (
    <InterviewExperiences
      pageType={pageType}
      pageName={jobTitle}
      page={page}
      pageSize={PAGE_SIZE}
      totalCount={interviewExperiencesCount}
      tabType={TAB_TYPE.INTERVIEW_EXPERIENCE}
      status={status}
      interviewExperiences={interviewExperiences}
      boxSelector={jobTitleInterviewExperiencesBoxSelectorByName(jobTitle)}
    />
  );
};

JobTitleTimeAndSalaryProvider.fetchData = ({
  store: { dispatch },
  ...props
}) => {
  const params = paramsSelector(props);
  const jobTitle = jobTitleSelector(params);
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  const companyName = searchTextFromQuerySelector(query) || undefined;
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;
  return dispatch(
    queryJobTitleInterviewExperiences({
      jobTitle,
      companyName,
      start,
      limit,
    }),
  );
};

export default JobTitleTimeAndSalaryProvider;
