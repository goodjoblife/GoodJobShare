import React from 'react';
import PropTypes from 'prop-types';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import StatusRenderer from '../StatusRenderer';
import WorkExperiencesSection from './WorkExperiences';

const WorkExperiences = ({
  pageType,
  pageName,
  tabType,
  workExperiences,
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
      data={workExperiences}
      status={status}
      page={page}
    >
      {WorkExperiencesSection}
    </StatusRenderer>
  </CompanyAndJobTitleWrapper>
);

WorkExperiences.propTypes = {
  pageType: PropTypes.string,
  pageName: PropTypes.string,
  tabType: PropTypes.string,
  workExperiences: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default WorkExperiences;
