import React, { useEffect, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import {
  queryCompanyWorkExperiencesAspectExperiences,
  queryCompanyWorkExperiencesAspectStatistics,
} from 'actions/company';
import { ExperienceType, WorkExperience } from 'apis/experience';
import Redirect from 'common/routing/Redirect';
import { paramsSelector, querySelector } from 'common/routing/selectors';
import NotFound from 'components/common/NotFound';
import CompanyAndJobTitleWrapper from 'components/CompanyAndJobTitle/CompanyAndJobTitleWrapper';
import WorkExperiencesAspect from 'components/CompanyAndJobTitle/WorkExperiences/Aspects';
import useRating from 'components/CompanyAndJobTitle/WorkExperiences/Aspects/useRating';
import {
  Aspect,
  aspectFromAPIValue,
  aspectFromPathComponent,
  generateAspectURL,
  PAGE_SIZE,
  PageType,
  TabType,
} from 'constants/companyJobTitle';
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
import FetchBox from 'utils/fetchBox';

import { aspectSelector, useAspectSlugParam } from './useAspectParam';
import useCompanyNameParam, {
  companyNameSelector,
} from './useCompanyNameParam';

const useWorkExperiencesAspectExperiencesBox = (
  pageName: string,
): FetchBox<CompanyAspectExperienceResult | null> => {
  const selector = useMemo(
    () => workExperiencesAspectExperiencesBoxSelectorByName(pageName),
    [pageName],
  );
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

type Params = {
  companyName: string;
  aspect: string;
};

const CompanyWorkExperiencesAspectPage: React.FC<{ aspect: Aspect }> = ({
  aspect,
}) => {
  const dispatch = useDispatch();
  const pageType = PageType.COMPANY;
  const companyName = useCompanyNameParam();
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

  const statisticsSelector = useMemo(
    () => workExperiencesAspectStatisticsBoxSelectorByName(companyName),
    [companyName],
  );
  const statisticsBox = useSelector(statisticsSelector);

  const experiencesBox = useWorkExperiencesAspectExperiencesBox(companyName);

  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={companyName}
      tabType={TabType.WORK_EXPERIENCE}
    >
      <WorkExperiencesAspect
        aspect={aspect}
        page={page as number}
        pageSize={PAGE_SIZE}
        statisticsBox={statisticsBox}
        experiencesBox={experiencesBox}
      />
    </CompanyAndJobTitleWrapper>
  );
};

// 網址上的 aspect 由使用者輸入，三種結果分開處理：合法 slug 正常渲染、
// 舊的中文網址導到英文 slug、其餘走 NotFound
const CompanyWorkExperiencesAspectProvider: React.FC &
  ServerSideRender<Params> = () => {
  const companyName = useCompanyNameParam();
  const slug = useAspectSlugParam();

  const aspect = aspectFromPathComponent(slug);
  if (aspect !== undefined) {
    return <CompanyWorkExperiencesAspectPage aspect={aspect} />;
  }

  const legacyAspect = aspectFromAPIValue(slug);
  if (legacyAspect !== undefined) {
    return (
      <Redirect
        to={generateAspectURL({ pageName: companyName, aspect: legacyAspect })}
      />
    );
  }

  return <NotFound />;
};

CompanyWorkExperiencesAspectProvider.fetchData = async ({
  store: { dispatch },
  ...props
}): Promise<unknown> => {
  const params = paramsSelector<Params>(props);
  const companyName = companyNameSelector(params);
  const aspect = aspectSelector(params);
  // 不合法的 aspect 由 component 端 redirect 或 NotFound，這裡不必查
  if (aspect === undefined) return Promise.resolve();

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
