import React from 'react';
import PropTypes from 'prop-types';

import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import StatusRenderer from '../StatusRenderer';
import InterviewExperiencesSection from './InterviewExperiences';
import Helmet from './Helmet';

const InterviewExperiences = ({
  pageType,
  pageName,
  tabType,
  interviewExperiences,
  status,
  page,
  canView,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    <StatusRenderer status={status}>
      <Helmet
        pageType={pageType}
        pageName={pageName}
        interviewExperiences={interviewExperiences}
        page={page}
      />
      <InterviewExperiencesSection
        pageType={pageType}
        pageName={pageName}
        tabType={tabType}
        data={interviewExperiences}
        page={page}
        canView={canView}
      />
    </StatusRenderer>
  </CompanyAndJobTitleWrapper>
);

InterviewExperiences.propTypes = {
  canView: PropTypes.bool.isRequired,
  interviewExperiences: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string,
  pageType: PropTypes.string,
  status: PropTypes.string.isRequired,
  tabType: PropTypes.string,
};

export default InterviewExperiences;
