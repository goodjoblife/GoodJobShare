import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import { PageBoxRenderer } from '../StatusRenderer';
import InterviewExperiencesSection from './InterviewExperiences';
import InterviewExperienceHelmet from './Helmet';
import Searchbar from '../Searchbar';
import Sorter from '../Sorter';
import styles from '../styles.module.css';

const InterviewExperiences = ({
  pageType,
  pageName,
  tabType,
  boxSelector,
  page,
  pageSize,
  topNJobTitles,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    <div className={styles.interactive}>
      <Searchbar pageType={pageType} tabType={tabType} />
      <Sorter />
    </div>
    <PageBoxRenderer
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
      boxSelector={boxSelector}
      render={({
        interviewExperiences,
        interviewExperiencesCount: totalCount,
      }) => {
        return (
          <Fragment>
            <InterviewExperienceHelmet
              pageType={pageType}
              pageName={pageName}
              totalCount={totalCount}
              page={page}
              topNJobTitles={topNJobTitles}
            />
            <InterviewExperiencesSection
              pageType={pageType}
              pageName={pageName}
              tabType={tabType}
              data={interviewExperiences}
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

InterviewExperiences.propTypes = {
  boxSelector: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  topNJobTitles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
};

export default InterviewExperiences;
