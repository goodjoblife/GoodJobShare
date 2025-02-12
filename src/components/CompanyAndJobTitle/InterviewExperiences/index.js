import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import { PageBoxRenderer } from '../BoxRenderer';
import InterviewExperiencesSection from './InterviewExperiences';
import InterviewExperienceHelmet from './Helmet';
import Searchbar from '../Searchbar';

const InterviewExperiences = ({
  pageType,
  pageName,
  tabType,
  boxSelector,
  interviewExperiences,
  page,
  pageSize,
  totalCount,
  topNJobTitles,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    <Searchbar pageType={pageType} tabType={tabType} />
    <PageBoxRenderer
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
      boxSelector={boxSelector}
      render={() => {
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
  interviewExperiences: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  topNJobTitles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default InterviewExperiences;
