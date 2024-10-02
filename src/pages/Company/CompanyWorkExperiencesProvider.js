import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WorkExperiences from 'components/CompanyAndJobTitle/WorkExperiences';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import { tabType, pageType as PAGE_TYPE } from 'constants/companyJobTitle';
import {
  queryCompanyWorkExperiences,
  queryRatingStatistics,
} from 'actions/company';
import {
  workExperiences as workExperiencesSelector,
  workExperiencesCount as workExperiencesCountSelector,
  status as statusSelector,
  companyWorkExperiencesBoxSelectorByName as workExperiencesBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import { usePageName, pageNameSelector } from './usePageName';
import { pageFromQuerySelector } from 'selectors/routing/page';
import {
  searchTextFromQuerySelector,
  useSearchTextFromQuery,
} from 'components/CompanyAndJobTitle/Searchbar';

const useWorkExperiencesBox = pageName => {
  const selector = useCallback(
    state => {
      const company = workExperiencesBoxSelectorByName(pageName)(state);
      return {
        status: statusSelector(company),
        workExperiences: workExperiencesSelector(company),
        workExperiencesCount: workExperiencesCountSelector(company),
      };
    },
    [pageName],
  );

  return useSelector(selector);
};

const PAGE_SIZE = 10;

const CompanyWorkExperiencesProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.COMPANY;
  const pageName = usePageName();
  const [jobTitle] = useSearchTextFromQuery();
  const page = usePage();
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  useEffect(() => {
    dispatch(
      queryCompanyWorkExperiences({
        companyName: pageName,
        jobTitle: jobTitle || undefined,
        start,
        limit,
      }),
    );
  }, [dispatch, pageName, jobTitle, start, limit]);

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

CompanyWorkExperiencesProvider.fetchData = ({
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
  return Promise.all([
    dispatch(
      queryCompanyWorkExperiences({
        companyName: pageName,
        jobTitle,
        start,
        limit,
      }),
    ),
    dispatch(queryRatingStatistics(pageName)),
  ]);
};

export default CompanyWorkExperiencesProvider;
