import React, { useEffect, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import {
  queryCompanyWorkExperiences,
  queryCompanyWorkExperiencesAspectStatistics,
  queryRatingStatistics,
} from 'actions/company';
import { ExperienceType, WorkExperience } from 'apis/experience';
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
import usePermission from 'hooks/usePermission';
import { RootState } from 'reducers';
import { CompanyWorkExperienceResult } from 'reducers/companyIndex';
import { companyWorkExperiencesBoxSelectorByName as workExperiencesBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { experienceBoxSelectorAtId } from 'selectors/experienceSelector';
import {
  pageFromQuerySelector,
  queryFromQuerySelector,
} from 'selectors/routing';
import { ServerSideRender } from 'types/serverSideRender';
import FetchBox from 'utils/fetchBox';

import useCompanyNameParam, {
  companyNameSelector,
} from './useCompanyNameParam';

const useWorkExperiencesBox = (
  pageName: string,
): FetchBox<CompanyWorkExperienceResult | null> => {
  const selector = useMemo(() => workExperiencesBoxSelectorByName(pageName), [
    pageName,
  ]);
  const box = useSelector(selector);
  const workExperiences = box.data ? box.data.workExperiences : null;

  // Get experience data from state.experiences, which serves as the source of
  // truth of experiences. shallowEqual keeps the array stable unless one of
  // the experiences actually changed.
  const latestWorkExperiences = useSelector(
    (state: RootState): WorkExperience[] | null =>
      workExperiences
        ? workExperiences.map((e: WorkExperience) => {
            const cached = experienceBoxSelectorAtId(e.id)(state).data;
            // experienceById is keyed across all experience types, so narrow
            // back to WorkExperience before using the cached copy.
            return cached && cached.type === ExperienceType.WORK ? cached : e;
          })
        : null,
    shallowEqual,
  );

  return useMemo(
    () =>
      box.data && latestWorkExperiences
        ? {
            ...box,
            data: { ...box.data, workExperiences: latestWorkExperiences },
          }
        : box,
    [box, latestWorkExperiences],
  );
};

// Matches the React Router route params for Company pages
type Params = { companyName: string };

const CompanyWorkExperiencesProvider: React.FC &
  ServerSideRender<Params> = () => {
  const dispatch = useDispatch();
  const pageType = PageType.COMPANY;
  const companyName = useCompanyNameParam();
  const [jobTitle] = useSearchTextFromQuery();
  const [sortBy] = useSortByFromQuery();
  const page = usePage();
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  useEffect(() => {
    dispatch(queryRatingStatistics(companyName));
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(queryCompanyWorkExperiencesAspectStatistics({ companyName }));
  }, [dispatch, companyName]);

  useEffect(() => {
    dispatch(
      queryCompanyWorkExperiences({
        companyName,
        jobTitle: jobTitle || undefined,
        start,
        limit,
        sortBy,
      }),
    );
  }, [dispatch, companyName, jobTitle, start, limit, sortBy]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, companyName, fetchPermission]);

  const workExperiencesBox = useWorkExperiencesBox(companyName);

  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={companyName}
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

CompanyWorkExperiencesProvider.fetchData = ({
  store: { dispatch },
  ...props
}): Promise<unknown> => {
  const params = paramsSelector<Params>(props);
  const companyName = companyNameSelector(params);
  const query = querySelector(props);
  const page = pageFromQuerySelector(query);
  const jobTitle = queryFromQuerySelector(query) || undefined;
  const sortBy = sortByFromQuerySelector(query);
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;
  return Promise.all([
    dispatch(
      queryCompanyWorkExperiences({
        companyName,
        jobTitle,
        start,
        limit,
        sortBy,
      }),
    ),
    dispatch(queryRatingStatistics(companyName)),
    dispatch(queryCompanyWorkExperiencesAspectStatistics({ companyName })),
  ]);
};

export default CompanyWorkExperiencesProvider;
