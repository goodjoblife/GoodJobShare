import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import { PageBoxRenderer } from '../StatusRenderer';
import WorkExperiencesSection from './WorkExperiences';
import Helmet from './Helmet';
import Searchbar from '../Searchbar';
import Sorter from '../Sorter';
import styles from '../styles.module.css';
import { Wrapper } from 'common/base';
import { GenderScoreCard, WorkLifeBalanceCard } from '../Overview/ScoreCard';

const WorkExperiences = ({
  pageType,
  pageName,
  tabType,
  boxSelector,
  page,
  pageSize,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    <Wrapper size="l">
      <div className={styles.scoreCards}>
        <GenderScoreCard />
        <WorkLifeBalanceCard />
      </div>
    </Wrapper>
    <Wrapper size="m">
      <div className={styles.interactive}>
        <Searchbar pageType={pageType} tabType={tabType} />
        <Sorter />
      </div>
    </Wrapper>
    <PageBoxRenderer
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
      boxSelector={boxSelector}
      render={({ workExperiences, workExperiencesCount: totalCount }) => {
        return (
          <Fragment>
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
          </Fragment>
        );
      }}
    />
  </CompanyAndJobTitleWrapper>
);

WorkExperiences.propTypes = {
  boxSelector: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
};

export default WorkExperiences;
