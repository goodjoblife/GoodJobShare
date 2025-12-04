import React from 'react';
import { generatePath, useParams } from 'react-router';
import { Heading, Link } from 'common/base';
import { companyNameSelector } from 'pages/Company/useCompanyName';
import { companyWorkExperiencesPath } from 'constants/linkTo';
import CompanyAndJobTitleWrapper from '../../CompanyAndJobTitleWrapper';
import { PageBoxRenderer } from '../../StatusRenderer';
import WorkExperiencesSection from '../WorkExperiences';
import Helmet from '../Helmet';
import styles from './styles.module.css';
import Filter from './Filter';

export type AspectProps = {
  title: React.ReactNode;
  summarySection?: React.ReactNode;
  filterSection?: React.ReactNode;
  pageType: string;
  pageName: string;
  tabType: string;
  boxSelector: (data: any) => any;
  page: number;
  pageSize: number;
};

const Aspect: React.FC<AspectProps> = ({
  title,
  summarySection,
  filterSection,
  pageType,
  pageName,
  tabType,
  boxSelector,
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
      <Link to={parentPath}>&lt;&lt;回到評價分頁</Link>
      <Heading className={styles.title}>{title}</Heading>
      <PageBoxRenderer
        pageType={pageType}
        pageName={pageName}
        tabType={tabType}
        boxSelector={boxSelector}
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
            {summarySection}
            {filterSection || <Filter />}
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

export default Aspect;
