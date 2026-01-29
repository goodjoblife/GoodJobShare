import React from 'react';
import { generatePath, useParams } from 'react-router';
import { Heading, Link, Wrapper } from 'common/base';
import { companyNameSelector } from 'pages/Company/useCompanyName';
import { companyWorkExperiencesPath } from 'constants/linkTo';
import CompanyAndJobTitleWrapper from '../../CompanyAndJobTitleWrapper';
import { PageBoxRenderer } from '../../StatusRenderer';
import WorkExperiencesSection from '../WorkExperiences';
import Helmet from '../Helmet';
import styles from './styles.module.css';
import RatingFilter from './RatingFilter';
import Summary from './Summary';
import FetchBox from 'utils/fetchBox';
import { Aspect, aspectTranslation } from 'constants/companyJobTitle';

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
  workExperiences: any[];
  workExperiencesCount: number;
};

export type AspectProps = {
  aspect: Aspect;
  pageType: string;
  pageName: string;
  tabType: string;
  statisticsBoxSelector: (state: any) => FetchBox<AspectStatisticsData>;
  experiencesBoxSelector: (state: any) => FetchBox<AspectExperiencesData>;
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
  const params = useParams();
  const companyName = companyNameSelector(params);
  const parentPath = generatePath(companyWorkExperiencesPath, { companyName });
  const title = aspectTranslation[aspect];

  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
    >
      <Wrapper size="l">
        <Link to={parentPath}>&lt;&lt;回到評價分頁</Link>
        <Heading className={styles.title}>{title}</Heading>
        <PageBoxRenderer
          pageType={pageType}
          pageName={pageName}
          tabType={tabType}
          boxSelector={statisticsBoxSelector}
          render={(data: AspectStatisticsData) => {
            const items = data.companyAspectRatingStatistics;
            const item = items.find(item => item.aspect === title);
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
          workExperiences: any; // eslint-disable-line react/no-unused-prop-types
          workExperiencesCount: number; // eslint-disable-line react/no-unused-prop-types
        }) => (
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
            />
          </>
        )}
      />
    </CompanyAndJobTitleWrapper>
  );
};

export default AspectSection;
