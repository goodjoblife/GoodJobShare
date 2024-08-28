import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import { BoxStatusRenderer } from '../StatusRenderer';
import InterviewExperiencesSection from './InterviewExperiences';
import InterviewExperienceHelmet from './Helmet';
import Searchbar from '../Searchbar';

const InterviewExperiences = ({
  pageType,
  pageName,
  tabType,
  interviewExperiences,
  page,
  pageSize,
  totalCount,
  canView,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    <Searchbar pageType={pageType} tabType={tabType} />
    <BoxStatusRenderer
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
      render={() => {
        return (
          <Fragment>
            <InterviewExperienceHelmet
              pageType={pageType}
              pageName={pageName}
              totalCount={totalCount}
              page={page}
            />
            <InterviewExperiencesSection
              pageType={pageType}
              pageName={pageName}
              tabType={tabType}
              data={interviewExperiences}
              page={page}
              pageSize={pageSize}
              totalCount={totalCount}
              canView={canView}
            />
          </Fragment>
        );
      }}
    />
  </CompanyAndJobTitleWrapper>
);

InterviewExperiences.propTypes = {
  canView: PropTypes.bool.isRequired,
  interviewExperiences: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default InterviewExperiences;
