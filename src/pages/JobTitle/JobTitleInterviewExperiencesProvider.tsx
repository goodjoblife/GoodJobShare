import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { queryJobTitleInterviewExperiences } from 'actions/jobTitle';
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
import { JobTitleInterviewExperienceResult } from 'reducers/jobTitleIndex';
import { jobTitleInterviewExperiencesBoxSelectorByName } from 'selectors/companyAndJobTitle';
import {
  pageFromQuerySelector,
  queryFromQuerySelector,
} from 'selectors/routing';
import { ServerSideRender } from 'types/serverSideRender';
import FetchBox from 'utils/fetchBox';

import useJobTitleParam, { jobTitleSelector } from './useJobTitleParam';

const useInterviewExperiencesBox = (
  pageName: string,
): FetchBox<JobTitleInterviewExperienceResult | null> => {
  const selector = useMemo(
    () => jobTitleInterviewExperiencesBoxSelectorByName(pageName),
    [pageName],
  );
  return useBoxWithLatestExperiences(
    useSelector(selector),
    'interviewExperiences',
  );
};

// Matches the React Router route params for JobTitle pages
type Params = { jobTitle: string };

const JobTitleInterviewExperiencesProvider: React.FC &
  ServerSideRender<Params> = () => {
  const dispatch = useDispatch();
  const pageType = PageType.JOB_TITLE;
  const jobTitle = useJobTitleParam();
  const [companyName] = useSearchTextFromQuery();
  const [sortBy] = useSortByFromQuery();
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
        sortBy,
      }),
    );
  }, [dispatch, jobTitle, companyName, start, limit, sortBy]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, jobTitle, fetchPermission]);

  const interviewExperiencesBox = useInterviewExperiencesBox(jobTitle);

  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={jobTitle}
      tabType={TabType.INTERVIEW_EXPERIENCE}
    >
      <InterviewExperiences
        page={page}
        pageSize={PAGE_SIZE}
        interviewExperiencesBox={interviewExperiencesBox}
      />
    </CompanyAndJobTitleWrapper>
  );
};

JobTitleInterviewExperiencesProvider.fetchData = async ({
  store: { dispatch },
  ...props
}): Promise<unknown> => {
  const params = paramsSelector<Params>(props);
  const jobTitle = jobTitleSelector(params);
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  const sortBy = sortByFromQuerySelector(query);
  const companyName = queryFromQuerySelector(query) || undefined;
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;
  return dispatch(
    queryJobTitleInterviewExperiences({
      jobTitle,
      companyName,
      start,
      limit,
      sortBy,
    }),
  );
};

export default JobTitleInterviewExperiencesProvider;
