import React from 'react';
import PropTypes from 'prop-types';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import StatusRenderer from '../StatusRenderer';
import InterviewExperiencesSection from './InterviewExperiences';
import InterviewExperienceHelmet from './Helmet';
import Searchbar from '../Searchbar';

const InterviewExperiences = ({
  pageType,
  pageName,
  tabType,
  interviewExperiences,
  status,
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
    <InterviewExperienceHelmet
      pageType={pageType}
      pageName={pageName}
      interviewExperiences={interviewExperiences}
      page={page}
    />
    <Searchbar pageType={pageType} tabType={tabType} />
    <StatusRenderer status={status}>
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
    </StatusRenderer>
  </CompanyAndJobTitleWrapper>
);

InterviewExperiences.propTypes = {
  canView: PropTypes.bool.isRequired,
  interviewExperiences: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default InterviewExperiences;
