import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import WorkExperiencesAspect, {
  AspectExperiencesData,
  AspectStatisticsData,
} from 'components/CompanyAndJobTitle/WorkExperiences//Aspects';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import {
  tabType as TAB_TYPE,
  pageType as PAGE_TYPE,
  PAGE_SIZE,
  Aspect,
} from 'constants/companyJobTitle';
import {
  queryCompanyWorkExperiencesAspectStatistics,
  queryCompanyWorkExperiencesAspectExperiences,
} from 'actions/company';
import {
  companyWorkExperiencesAspectStatisticsBoxSelectorByName as workExperiencesAspectStatisticsBoxSelectorByName,
  companyWorkExperiencesAspectExperiencesBoxSelectorByName as workExperiencesAspectExperiencesBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import useCompanyName, { companyNameSelector } from './useCompanyName';
import { pageFromQuerySelector } from 'selectors/routing/page';
import FetchBox, { isFetched, getFetched } from 'utils/fetchBox';
import { experienceBoxSelectorAtId } from 'selectors/experienceSelector';
import useAspect, { aspectSelector } from './useAspect';
import { ratingFromQuerySelector } from 'selectors/routing/ratings';
import useRating from 'components/CompanyAndJobTitle/WorkExperiences/Aspects/useRating';
import { RootState } from 'reducers';

const useWorkExperiencesAspectExperiencesBoxSelector = (
  pageName: string,
  aspect: Aspect,
): ((state: RootState) => FetchBox<AspectExperiencesData>) => {
  return useCallback(
    (state: RootState): FetchBox<AspectExperiencesData> => {
      const box = workExperiencesAspectExperiencesBoxSelectorByName(pageName)(
        state,
      ) as FetchBox<AspectExperiencesData>;
      if (isFetched(box) && box.data) {
        // Get experience data from state.experiences, which serves
        // as the source of truth of experiences.
        const data: AspectExperiencesData = {
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

const CompanyWorkExperiencesAspectProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.COMPANY;
  const companyName = useCompanyName();
  const aspect = useAspect();
  const [rating] = useRating();
  const page = usePage();
  const start = ((page as number) - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  useEffect(() => {
    dispatch(queryCompanyWorkExperiencesAspectStatistics({ companyName }));
  }, [dispatch, companyName, aspect]);

  useEffect(() => {
    dispatch(
      queryCompanyWorkExperiencesAspectExperiences({
        companyName,
        aspect,
        rating,
        start,
        limit,
      }),
    );
  }, [dispatch, companyName, aspect, rating, start, limit]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    (fetchPermission as () => Promise<void>)();
  }, [pageType, companyName, fetchPermission]);

  const statisticsBoxSelector = workExperiencesAspectStatisticsBoxSelectorByName(
    companyName,
  ) as ((state: RootState) => FetchBox<AspectStatisticsData>);

  const experiencesBoxSelector = useWorkExperiencesAspectExperiencesBoxSelector(
    companyName,
    aspect,
  ) as ((state: RootState) => FetchBox<AspectExperiencesData>);

  return (
    <WorkExperiencesAspect
      aspect={aspect}
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
  const params = (paramsSelector(props) || {}) as Record<string, string>;
  const companyName = companyNameSelector(params);
  const aspect = aspectSelector(params);

  const query = querySelector(props);
  const rating = ratingFromQuerySelector(query);
  const page = pageFromQuerySelector(query) as number;
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  return dispatch(
    queryCompanyWorkExperiencesAspectExperiences({
      companyName,
      aspect,
      rating,
      start,
      limit,
    }),
  );
};

export default CompanyWorkExperiencesAspectProvider;
