import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WorkExperiences from '../CompanyAndJobTitle/WorkExperiences';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import { tabType, pageType as PAGE_TYPE } from 'constants/companyJobTitle';
import { queryJobTitleWorkExperiences } from 'actions/jobTitle';
import {
  workExperiences as workExperiencesSelector,
  workExperiencesCount as workExperiencesCountSelector,
  status as statusSelector,
  jobTitleWorkExperiencesBoxSelectorByName as workExperiencesBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import { usePageName, pageNameSelector } from './usePageName';
import { pageFromQuerySelector } from 'selectors/routing/page';
import {
  searchTextFromQuerySelector,
  useSearchTextFromQuery,
} from 'pages/CompanyAndJobTitle/useSearchbar';

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

const PAGE_SIZE = 10;

const JobTitleWorkExperiencesProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.JOB_TITLE;
  const pageName = usePageName();
  const [companyName] = useSearchTextFromQuery();
  const page = usePage();
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  useEffect(() => {
    dispatch(
      queryJobTitleWorkExperiences({
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
    workExperiences,
    workExperiencesCount,
  } = useWorkExperiencesBox(pageName);

  return (
    <WorkExperiences
      pageType={pageType}
      pageName={pageName}
      page={page}
      pageSize={PAGE_SIZE}
      totalCount={workExperiencesCount}
      canView={canView}
      tabType={tabType.WORK_EXPERIENCE}
      status={status}
      workExperiences={workExperiences}
    />
  );
};

JobTitleWorkExperiencesProvider.fetchData = ({
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
    queryJobTitleWorkExperiences({
      jobTitle: pageName,
      companyName,
      start,
      limit,
    }),
  );
};

export default JobTitleWorkExperiencesProvider;
