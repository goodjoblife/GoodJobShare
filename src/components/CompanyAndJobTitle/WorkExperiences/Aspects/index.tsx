import React from 'react';
import { useSelector } from 'react-redux';

import { AspectStatisticsData } from 'apis/aspectRatingStatistics';
import { Heading, Link, Wrapper } from 'common/base';
import { useCreatePageLinkTo } from 'common/Pagination/Pagination';
import { Aspect, generateTabURL } from 'constants/companyJobTitle';
import { RootState } from 'reducers';
import { CompanyAspectExperienceResult } from 'reducers/companyIndex';
import FetchBox, { isFetched } from 'utils/fetchBox';

import PageBoxRenderer from '../../PageBoxRenderer';
import { usePageContext } from '../../PageContextProvider';
import WorkExperiencesSection from '../WorkExperiences';
import Helmet from './Helmet';
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
  const statisticsBox = useSelector(statisticsBoxSelector);
  const statistics =
    isFetched(statisticsBox) && statisticsBox.data
      ? statisticsBox.data.companyAspectRatingStatistics.find(
          item => item.aspect === aspect,
        )
      : undefined;

  return (
    <>
      <Helmet
        companyName={pageName}
        aspect={aspect}
        page={page}
        statistics={statistics}
      />
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
          )}
        />
      </Wrapper>
    </>
  );
};

export default AspectSection;
