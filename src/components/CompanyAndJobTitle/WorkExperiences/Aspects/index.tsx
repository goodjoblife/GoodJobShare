import React from 'react';

import { Heading, Link, Wrapper } from 'common/base';
import { useCreatePageLinkTo } from 'common/Pagination/Pagination';
import {
  Aspect,
  aspectTranslation,
  generateTabURL,
} from 'constants/companyJobTitle';
import { RootState } from 'reducers';
import {
  AspectStatisticsDataInIndex,
  CompanyAspectExperienceResult,
} from 'reducers/companyIndex';
import FetchBox from 'utils/fetchBox';

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
  ) => FetchBox<AspectStatisticsDataInIndex | null>;
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
        <Heading className={styles.title}>{aspectTranslation[aspect]}</Heading>
        <PageBoxRenderer
          pageType={pageType}
          pageName={pageName}
          tabType={tabType}
          boxSelector={statisticsBoxSelector}
          render={(data: AspectStatisticsDataInIndex): React.ReactNode => {
            const items = data.companyAspectRatingStatistics;
            const item = items.find(item => item.aspect === aspect);

            return (
              <>
                <Helmet
                  companyName={pageName}
                  aspect={aspect}
                  page={page}
                  statistics={item}
                />
                {item && (
                  <Summary
                    averageRating={item.averageRating}
                    ratingDistribution={item.ratingDistribution}
                    ratingCount={item.ratingCount}
                  />
                )}
              </>
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
