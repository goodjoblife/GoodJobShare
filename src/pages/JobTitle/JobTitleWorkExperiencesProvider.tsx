import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { queryJobTitleWorkExperiences } from 'actions/jobTitle';
import { ExperienceType } from 'apis/experience';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import CompanyAndJobTitleWrapper from 'components/CompanyAndJobTitle/CompanyAndJobTitleWrapper';
import { useSearchTextFromQuery } from 'components/CompanyAndJobTitle/SearchBar';
import {
  sortByFromQuerySelector,
  useSortByFromQuery,
} from 'components/CompanyAndJobTitle/Sorter';
import WorkExperiences from 'components/CompanyAndJobTitle/WorkExperiences';
import { PAGE_SIZE, PageType, TabType } from 'constants/companyJobTitle';
import { usePage } from 'hooks/routing/page';
import useBoxWithLatestExperiences from 'hooks/useBoxWithLatestExperiences';
import usePermission from 'hooks/usePermission';
import { JobTitleWorkExperienceResult } from 'reducers/jobTitleIndex';
import { jobTitleWorkExperiencesBoxSelectorByName as workExperiencesBoxSelectorByName } from 'selectors/companyAndJobTitle';
import {
  pageFromQuerySelector,
  queryFromQuerySelector,
} from 'selectors/routing';
import { ServerSideRender } from 'types/serverSideRender';
import FetchBox from 'utils/fetchBox';

import useJobTitleParam, { jobTitleSelector } from './useJobTitleParam';

const useWorkExperiencesBox = (
  pageName: string,
): FetchBox<JobTitleWorkExperienceResult | null> => {
  const selector = useMemo(() => workExperiencesBoxSelectorByName(pageName), [
    pageName,
  ]);
  const box = useSelector(selector);
  return useBoxWithLatestExperiences(
    box,
    'workExperiences',
    ExperienceType.WORK,
  );
};

// Matches the React Router route params for JobTitle pages
type Params = { jobTitle: string };

const JobTitleWorkExperiencesProvider: React.FC &
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
      queryJobTitleWorkExperiences({
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

  const workExperiencesBox = useWorkExperiencesBox(jobTitle);

  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={jobTitle}
      tabType={TabType.WORK_EXPERIENCE}
    >
      <WorkExperiences
        page={page}
        pageSize={PAGE_SIZE}
        workExperiencesBox={workExperiencesBox}
      />
    </CompanyAndJobTitleWrapper>
  );
};

JobTitleWorkExperiencesProvider.fetchData = async ({
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
    queryJobTitleWorkExperiences({
      jobTitle,
      companyName,
      start,
      limit,
      sortBy,
    }),
  );
};

export default JobTitleWorkExperiencesProvider;
