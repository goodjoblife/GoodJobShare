import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import WorkExperiencesAspect from 'components/CompanyAndJobTitle/WorkExperiences//Aspects';
import usePermission from 'hooks/usePermission';
import { usePage } from 'hooks/routing/page';
import {
  tabType as TAB_TYPE,
  pageType as PAGE_TYPE,
  PAGE_SIZE,
  aspectTranslation,
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
import { isFetched, getFetched } from 'utils/fetchBox';
import { experienceBoxSelectorAtId } from 'selectors/experienceSelector';
import useAspect, { aspectSelector } from './useAspect';
import { ratingsFromQuerySelector } from 'selectors/routing/ratings';
import { useRatings } from 'components/CompanyAndJobTitle/WorkExperiences/Aspects/useRatings';

const useWorkExperiencesAspectExperiencesBoxSelector = (
  pageName: string,
  aspect: string,
) => {
  return useCallback(
    (state: any) => {
      const box = workExperiencesAspectExperiencesBoxSelectorByName(
        pageName,
        aspect,
      )(state);
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
    [pageName, aspect],
  );
};

const CompanyWorkExperiencesAspectProvider = () => {
  const dispatch = useDispatch();
  const pageType = PAGE_TYPE.COMPANY;
  const companyName = useCompanyName();
  const aspect = useAspect();
  const [ratings] = useRatings();
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
      queryCompanyWorkExperiencesAspectExperiences({
        companyName,
        aspect,
        ratings,
        start,
        limit,
      }),
    );
  }, [dispatch, companyName, aspect, ratings, start, limit]);

  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [pageType, companyName, fetchPermission]);

  const experiencesBoxSelector = useWorkExperiencesAspectExperiencesBoxSelector(
    companyName,
    aspect,
  );
  const statisticsBoxSelector = workExperiencesAspectStatisticsBoxSelectorByName(
    companyName,
    aspect,
  );
  const title = aspectTranslation[aspect];

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
  const aspect = aspectSelector(params);

  const query = querySelector(props);
  const ratings = ratingsFromQuerySelector(query);
  const page = pageFromQuerySelector(query) as number;
  const start = (page - 1) * PAGE_SIZE;
  const limit = PAGE_SIZE;

  return dispatch(
    queryCompanyWorkExperiencesAspectExperiences({
      companyName,
      aspect,
      ratings,
      start,
      limit,
    }),
  );
};

export default CompanyWorkExperiencesAspectProvider;
