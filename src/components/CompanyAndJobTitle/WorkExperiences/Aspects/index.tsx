import React from 'react';

import { AspectStatisticsData } from 'apis/aspectRatingStatistics';
import { Heading, Link, Wrapper } from 'common/base';
import { useCreatePageLinkTo } from 'common/Pagination/Pagination';
import { Aspect, generateTabURL } from 'constants/companyJobTitle';
import { RootState } from 'reducers';
import { CompanyAspectExperienceResult } from 'reducers/companyIndex';
import FetchBox from 'utils/fetchBox';

import PageBoxRenderer from '../../PageBoxRenderer';
import { usePageContext } from '../../PageContextProvider';
import Helmet from '../Helmet';
import WorkExperiencesSection from '../WorkExperiences';
import RatingFilter from './RatingFilter';
import styles from './styles.module.css';
import Summary from './Summary';

export type AspectProps = {
  aspect: Aspect;
  statisticsBoxSelector: (
    state: RootState,
  ) => FetchBox<AspectStatisticsData | null>;
  experiencesBoxSelector: (
    state: RootState,
  ) => FetchBox<CompanyAspectExperienceResult | null>;
  page: number;
  pageSize: number;
};

const AspectSection: React.FC<AspectProps> = ({
  aspect,
  statisticsBoxSelector,
  experiencesBoxSelector,
  page,
  pageSize,
}) => {
  const { pageType, pageName, tabType } = usePageContext();
  const parentPath = generateTabURL({ pageType, pageName, tabType });
  const [createPageLinkTo, handleSectionRef] = useCreatePageLinkTo();

  return (
    <>
      <Wrapper size="l">
        <Link to={parentPath}>&lt;&lt;回到評價分頁</Link>
        <Heading className={styles.title}>{aspect}</Heading>
        <PageBoxRenderer
          pageType={pageType}
          pageName={pageName}
          tabType={tabType}
          boxSelector={statisticsBoxSelector}
          render={(data: AspectStatisticsData): React.ReactNode => {
            const items = data.companyAspectRatingStatistics;
            const item = items.find(item => item.aspect === aspect);
            if (!item) return null;

            const { averageRating, ratingDistribution, ratingCount } = item;

            return (
              <Summary
                averageRating={averageRating}
                ratingDistribution={ratingDistribution}
                ratingCount={ratingCount}
              />
            );
          }}
        />
      </Wrapper>
      <Wrapper ref={handleSectionRef} size="m">
        <RatingFilter />
        <PageBoxRenderer
          pageType={pageType}
          pageName={pageName}
          tabType={tabType}
          boxSelector={experiencesBoxSelector}
          render={({
            workExperiences,
            workExperiencesCount: totalCount,
          }: CompanyAspectExperienceResult): React.ReactNode => (
            <>
              <Helmet
                pageType={pageType}
                pageName={pageName}
                totalCount={totalCount}
                page={page}
              />
              <WorkExperiencesSection
                pageType={pageType}
                pageName={pageName}
                tabType={tabType}
                data={workExperiences}
                page={page}
                pageSize={pageSize}
                totalCount={totalCount}
                createPageLinkTo={createPageLinkTo}
              />
            </>
          )}
        />
      </Wrapper>
    </>
  );
};

export default AspectSection;
