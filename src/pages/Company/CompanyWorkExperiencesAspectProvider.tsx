import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import WorkExperiencesAspect from 'components/CompanyAndJobTitle/WorkExperiences//Aspects';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import {
  tabType as TAB_TYPE,
  pageType as PAGE_TYPE,
  PAGE_SIZE,
} from 'constants/companyJobTitle';
import {
  queryCompanyWorkExperiences,
  queryCompanyWorkExperiencesAspectStatistics,
  queryRatingStatistics,
} from 'actions/company';
import {
  companyWorkExperiencesBoxSelectorByName as workExperiencesBoxSelectorByName,
  companyWorkExperiencesAspectStatisticsBoxSelectorByName as workExperiencesAspectStatisticsBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import useCompanyName, { companyNameSelector } from './useCompanyName';
import { pageFromQuerySelector } from 'selectors/routing/page';
import { searchTextFromQuerySelector } from 'components/CompanyAndJobTitle/Searchbar';
import {
  sortByFromQuerySelector,
  useSortByFromQuery,
} from 'components/CompanyAndJobTitle/Sorter';
import { isFetched, getFetched } from 'utils/fetchBox';
import { experienceBoxSelectorAtId } from 'selectors/experienceSelector';
import useAspect from './useAspect';

const useWorkExperiencesAspectExperiencesBoxSelector = (pageName: string) => {
  return useCallback(
    (state: any) => {
      const box = workExperiencesBoxSelectorByName(pageName)(state);
      if (isFetched(box) && box.data) {
        // Get experience data from state.experiences, which serves
        // as the source of truth of experiences.
        const data = {
          ...box.data,
          workExperiences: box.data.workExperiences.map(
            (e: any) => experienceBoxSelectorAtId(e.id)(state).data || e,
          ),
        };
        return getFetched(data);
      }
      return box;
    },
    [pageName],
  );
};

const getAspectTitle = (aspect: string): string | null => {
  switch (aspect) {
    case 'gender':
      return '性別友善度';
    case 'work-life-balance':
      return '工作與生活平衡';
    default:
      return null;
  }
};

const CompanyWorkExperiencesAspectProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.COMPANY;
  const companyName = useCompanyName();
  const aspect = useAspect();
  const [sortBy] = useSortByFromQuery();
  const page = usePage();
  const start = ((page as number) - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  useEffect(() => {
    dispatch(
      queryCompanyWorkExperiencesAspectStatistics({ companyName, aspect }),
    );
  }, [dispatch, companyName, aspect]);

  useEffect(() => {
    dispatch(
      queryCompanyWorkExperiences({
        companyName,
        start,
        limit,
        sortBy,
      }),
    );
  }, [dispatch, companyName, start, limit, sortBy]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, companyName, fetchPermission]);

  const experiencesBoxSelector = useWorkExperiencesAspectExperiencesBoxSelector(
    companyName,
  );
  const statisticsBoxSelector = workExperiencesAspectStatisticsBoxSelectorByName(
    companyName,
    aspect,
  );
  const title = getAspectTitle(aspect);

  return (
    <WorkExperiencesAspect
      title={title}
      pageType={pageType}
      pageName={companyName}
      page={page as number}
      pageSize={PAGE_SIZE}
      tabType={TAB_TYPE.WORK_EXPERIENCE}
      statisticsBoxSelector={statisticsBoxSelector}
      experiencesBoxSelector={experiencesBoxSelector}
    />
  );
};

CompanyWorkExperiencesAspectProvider.fetchData = ({
  store: { dispatch },
  ...props
}: {
  store: { dispatch: any };
  [key: string]: any;
}) => {
  const params = paramsSelector(props);
  const companyName = companyNameSelector(params);
  const query = querySelector(props);
  const page = pageFromQuerySelector(query) as number;
  const jobTitle = searchTextFromQuerySelector(query) || undefined;
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
  ]);
};

export default CompanyWorkExperiencesAspectProvider;
