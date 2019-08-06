import React from 'react';
import PropTypes from 'prop-types';

import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import StatusRenderer from '../StatusRenderer';
import InterviewExperiencesSection from './InterviewExperiences';

const InterviewExperiences = ({
  pageType,
  pageName,
  tabType,
  interviewExperiences,
  status,
  page,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    <StatusRenderer
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
      data={interviewExperiences}
      status={status}
      page={page}
    >
      {props => <InterviewExperiencesSection {...props} />}
    </StatusRenderer>
  </CompanyAndJobTitleWrapper>
);

InterviewExperiences.propTypes = {
  pageType: PropTypes.string,
  pageName: PropTypes.string,
  tabType: PropTypes.string,
  interviewExperiences: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default InterviewExperiences;
