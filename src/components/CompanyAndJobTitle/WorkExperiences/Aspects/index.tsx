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
import Filter from './Filter';
import Summary from './Summary';
import FetchBox from 'utils/fetchBox';

export type AspectProps = {
  title: React.ReactNode;
  filterSection?: React.ReactNode;
  pageType: string;
  pageName: string;
  tabType: string;
  statisticsBoxSelector: (
    companyName: string,
    aspect: string,
  ) => FetchBox<{
    averageRating: number;
    ratingDistribution: { rating: number; count: number }[];
    ratingCount: number;
    summary: string;
  }>;
  experiencesBoxSelector: (
    companyName: string,
    aspect: string,
  ) => FetchBox<{ workExperiences: any[]; workExperiencesCount: number }>;
  page: number;
  pageSize: number;
};

const Aspect: React.FC<AspectProps> = ({
  title,
  filterSection,
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
          render={({
            averageRating,
            ratingDistribution,
            ratingCount,
            summary,
          }) => (
            <Summary
              averageRating={averageRating}
              ratingDistribution={ratingDistribution}
              ratingCount={ratingCount}
              summary={summary}
            />
          )}
        />
        {filterSection || <Filter />}
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
      </Wrapper>
    </CompanyAndJobTitleWrapper>
  );
};

export default Aspect;
