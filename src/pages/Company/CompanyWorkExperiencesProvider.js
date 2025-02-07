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
import useCompanyName, { companyNameSelector } from './useCompanyName';
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

const CompanyWorkExperiencesProvider = () => {
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
    dispatch(
      queryCompanyWorkExperiences({
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
    workExperiences,
    workExperiencesCount,
  } = useWorkExperiencesBox(companyName);

  return (
    <WorkExperiences
      pageType={pageType}
      pageName={companyName}
      page={page}
      pageSize={PAGE_SIZE}
      totalCount={workExperiencesCount}
      tabType={TAB_TYPE.WORK_EXPERIENCE}
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
  const companyName = companyNameSelector(params);
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  const jobTitle = searchTextFromQuerySelector(query) || undefined;
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;
  return Promise.all([
    dispatch(
      queryCompanyWorkExperiences({
        companyName,
        jobTitle,
        start,
        limit,
      }),
    ),
    dispatch(queryRatingStatistics(companyName)),
  ]);
};

export default CompanyWorkExperiencesProvider;
