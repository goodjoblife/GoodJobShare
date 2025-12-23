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
  queryRatingStatistics,
} from 'actions/company';
import { companyWorkExperiencesBoxSelectorByName as workExperiencesBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import useCompanyName, { companyNameSelector } from './useCompanyName';
import { pageFromQuerySelector } from 'selectors/routing/page';
import {
  searchTextFromQuerySelector,
  useSearchTextFromQuery,
} from 'components/CompanyAndJobTitle/Searchbar';
import {
  sortByFromQuerySelector,
  useSortByFromQuery,
} from 'components/CompanyAndJobTitle/Sorter';
import { isFetched, getFetched } from 'utils/fetchBox';
import { experienceBoxSelectorAtId } from 'selectors/experienceSelector';

// Added TypeScript notation for the argument
const useWorkExperiencesBoxSelector = (pageName: string) => {
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

const CompanyWorkExperiencesWorkLifeBalanceProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.COMPANY;
  const companyName = useCompanyName();
  const [jobTitle] = useSearchTextFromQuery();
  const [sortBy] = useSortByFromQuery();
  const page = usePage();
  const start = ((page as number) - 1) * PAGE_SIZE;
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
        sortBy,
      }),
    );
  }, [dispatch, companyName, jobTitle, start, limit, sortBy]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, companyName, fetchPermission]);

  const boxSelector = useWorkExperiencesBoxSelector(companyName);

  // Gender-relevant display data could be fetched here or above,
  // but as the original code used a mock, we keep the mock here
  const genderSummaryData = {
    averageRating: 3.5,
    ratingDistribution: [
      { rating: 5, count: 10 },
      { rating: 4, count: 20 },
      { rating: 3, count: 30 },
      { rating: 2, count: 20 },
      { rating: 1, count: 10 },
    ],
    ratingCount: 100,
    summary:
      '整體來說，OOO 股份有限公司的性別友善度相當高，生理假相對好請，不容易受到主管刁難。薪資分紅的部分，也是業界上非常好的。然而，不同部門加班情況不一，部分部門在旺季時每天平均需要加班2~3 小時。',
  };

  return (
    <WorkExperiencesAspect
      title="工作與生活平衡"
      averageRating={genderSummaryData.averageRating}
      ratingDistribution={genderSummaryData.ratingDistribution}
      ratingCount={genderSummaryData.ratingCount}
      summary={genderSummaryData.summary}
      pageType={pageType}
      pageName={companyName}
      page={page as number}
      pageSize={PAGE_SIZE}
      tabType={TAB_TYPE.WORK_EXPERIENCE}
      boxSelector={boxSelector}
    />
  );
};

CompanyWorkExperiencesWorkLifeBalanceProvider.fetchData = ({
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

export default CompanyWorkExperiencesWorkLifeBalanceProvider;
