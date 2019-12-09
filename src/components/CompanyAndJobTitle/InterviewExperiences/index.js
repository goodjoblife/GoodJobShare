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
  canViewExperienceDetail,
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
        canViewExperienceDetail={canViewExperienceDetail}
      />
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
  canViewExperienceDetail: PropTypes.bool.isRequired,
};

export default InterviewExperiences;
