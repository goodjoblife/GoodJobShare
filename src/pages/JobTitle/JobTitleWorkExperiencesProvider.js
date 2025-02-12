import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WorkExperiences from 'components/CompanyAndJobTitle/WorkExperiences';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import {
  tabType as TAB_TYPE,
  pageType as PAGE_TYPE,
  PAGE_SIZE,
} from 'constants/companyJobTitle';
import { queryJobTitleWorkExperiences } from 'actions/jobTitle';
import {
  workExperiences as workExperiencesSelector,
  workExperiencesCount as workExperiencesCountSelector,
  status as statusSelector,
  jobTitleWorkExperiencesBoxSelectorByName as workExperiencesBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import useJobTitle, { jobTitleSelector } from './useJobTitle';
import { pageFromQuerySelector } from 'selectors/routing/page';
import {
  searchTextFromQuerySelector,
  useSearchTextFromQuery,
} from 'components/CompanyAndJobTitle/Searchbar';

const useWorkExperiencesBox = pageName => {
  const selector = useCallback(
    state => {
      const jobTitle = workExperiencesBoxSelectorByName(pageName)(state);
      return {
        status: statusSelector(jobTitle),
        workExperiences: workExperiencesSelector(jobTitle),
        workExperiencesCount: workExperiencesCountSelector(jobTitle),
      };
    },
    [pageName],
  );

  return useSelector(selector);
};

const JobTitleWorkExperiencesProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.JOB_TITLE;
  const jobTitle = useJobTitle();
  const [companyName] = useSearchTextFromQuery();
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
      }),
    );
  }, [dispatch, jobTitle, companyName, start, limit]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, jobTitle, fetchPermission]);

  const {
    status,
    workExperiences,
    workExperiencesCount,
  } = useWorkExperiencesBox(jobTitle);

  return (
    <WorkExperiences
      pageType={pageType}
      pageName={jobTitle}
      page={page}
      pageSize={PAGE_SIZE}
      totalCount={workExperiencesCount}
      tabType={TAB_TYPE.WORK_EXPERIENCE}
      status={status}
      workExperiences={workExperiences}
      boxSelector={workExperiencesBoxSelectorByName(jobTitle)}
    />
  );
};

JobTitleWorkExperiencesProvider.fetchData = ({
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
    queryJobTitleWorkExperiences({
      jobTitle,
      companyName,
      start,
      limit,
    }),
  );
};

export default JobTitleWorkExperiencesProvider;
