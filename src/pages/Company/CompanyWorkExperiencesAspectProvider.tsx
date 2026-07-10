import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  queryCompanyWorkExperiencesAspectExperiences,
  queryCompanyWorkExperiencesAspectStatistics,
} from 'actions/company';
import { WorkExperience } from 'apis/experience';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import WorkExperiencesAspect from 'components/CompanyAndJobTitle/WorkExperiences/Aspects';
import useRating from 'components/CompanyAndJobTitle/WorkExperiences/Aspects/useRating';
import { PAGE_SIZE, PageType, TabType } from 'constants/companyJobTitle';
import { usePage } from 'hooks/routing/page';
import usePermission from 'hooks/usePermission';
import { RootState } from 'reducers';
import { CompanyAspectExperienceResult } from 'reducers/companyIndex';
import {
  companyWorkExperiencesAspectExperiencesBoxSelectorByName as workExperiencesAspectExperiencesBoxSelectorByName,
  companyWorkExperiencesAspectStatisticsBoxSelectorByName as workExperiencesAspectStatisticsBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { experienceBoxSelectorAtId } from 'selectors/experienceSelector';
import {
  pageFromQuerySelector,
  ratingFromQuerySelector,
} from 'selectors/routing';
import { ServerSideRender } from 'types/serverSideRender';
import FetchBox, { getFetched, isFetched } from 'utils/fetchBox';

import useAspect, { aspectSelector } from './useAspect';
import useCompanyName, { companyNameSelector } from './useCompanyName';

const useWorkExperiencesAspectExperiencesBoxSelector = (
  pageName: string,
): ((state: RootState) => FetchBox<CompanyAspectExperienceResult | null>) => {
  return useCallback(
    (state: RootState): FetchBox<CompanyAspectExperienceResult | null> => {
      const box = workExperiencesAspectExperiencesBoxSelectorByName(pageName)(
        state,
      );
      if (isFetched(box) && box.data) {
        // Get experience data from state.experiences, which serves
        // as the source of truth of experiences.
        const data: CompanyAspectExperienceResult = {
          ...box.data,
          workExperiences: box.data.workExperiences.map(
            (e: WorkExperience) =>
              experienceBoxSelectorAtId(e.id)(state).data || e,
          ),
        };
        return getFetched(data);
      }
      return box;
    },
    [pageName],
  );
};

type Params = {
  companyName: string;
  aspect: string;
};

const CompanyWorkExperiencesAspectProvider: React.FC &
  ServerSideRender<Params> = () => {
  const dispatch = useDispatch();
  const pageType = PageType.COMPANY;
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
  );

  const experiencesBoxSelector = useWorkExperiencesAspectExperiencesBoxSelector(
    companyName,
  );

  return (
    <WorkExperiencesAspect
      aspect={aspect}
      pageType={pageType}
      pageName={companyName}
      page={page as number}
      pageSize={PAGE_SIZE}
      tabType={TabType.WORK_EXPERIENCE}
      statisticsBoxSelector={statisticsBoxSelector}
      experiencesBoxSelector={experiencesBoxSelector}
    />
  );
};

CompanyWorkExperiencesAspectProvider.fetchData = async ({
  store: { dispatch },
  ...props
}): Promise<unknown> => {
  const params = paramsSelector<Params>(props);
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
