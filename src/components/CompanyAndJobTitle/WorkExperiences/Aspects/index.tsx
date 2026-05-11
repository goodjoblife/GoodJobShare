import React from 'react';
import { RootState } from 'reducers';
import { Heading, Link, Wrapper } from 'common/base';
import { useCreatePageLinkTo } from 'common/Pagination/Pagination';
import CompanyAndJobTitleWrapper from '../../CompanyAndJobTitleWrapper';
import { PageBoxRenderer } from '../../StatusRenderer';
import WorkExperiencesSection from '../WorkExperiences';
import Helmet from '../Helmet';
import styles from './styles.module.css';
import RatingFilter from './RatingFilter';
import Summary from './Summary';
import FetchBox from 'utils/fetchBox';
import {
  Aspect,
  PageType,
  TabType,
  generateTabURL,
} from 'constants/companyJobTitle';

export type RatingDistribution = {
  rating: number;
  count: number;
};

export type AspectStatistics = {
  aspect: Aspect;
  averageRating: number;
  ratingDistribution: RatingDistribution[];
  ratingCount: number;
  summary: string;
};

export type AspectStatisticsData = {
  companyAspectRatingStatistics: AspectStatistics[];
};

export type AspectExperiencesData = {
  workExperiences: unknown[];
  workExperiencesCount: number;
};

export type AspectProps = {
  aspect: Aspect;
  pageType: PageType;
  pageName: string;
  tabType: TabType;
  statisticsBoxSelector: (state: RootState) => FetchBox<AspectStatisticsData>;
  experiencesBoxSelector: (state: RootState) => FetchBox<AspectExperiencesData>;
  page: number;
  pageSize: number;
};

const AspectSection: React.FC<AspectProps> = ({
  aspect,
  pageType,
  pageName,
  tabType,
  statisticsBoxSelector,
  experiencesBoxSelector,
  page,
  pageSize,
}) => {
  const parentPath = generateTabURL({ pageType, pageName, tabType });
  const [createPageLinkTo] = useCreatePageLinkTo();

  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
    >
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

            const {
              averageRating,
              ratingDistribution,
              ratingCount,
              summary,
            } = item;

            return (
              <Summary
                averageRating={averageRating}
                ratingDistribution={ratingDistribution}
                ratingCount={ratingCount}
                summary={summary}
              />
            );
          }}
        />
        <RatingFilter />
      </Wrapper>
      <PageBoxRenderer
        pageType={pageType}
        pageName={pageName}
        tabType={tabType}
        boxSelector={experiencesBoxSelector}
        render={({
          workExperiences,
          workExperiencesCount: totalCount,
        }: {
          workExperiences: unknown[]; // eslint-disable-line react/no-unused-prop-types
          workExperiencesCount: number; // eslint-disable-line react/no-unused-prop-types
        }): React.ReactNode => (
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
    </CompanyAndJobTitleWrapper>
  );
};

export default AspectSection;
