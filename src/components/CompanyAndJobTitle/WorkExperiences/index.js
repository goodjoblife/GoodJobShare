import React from 'react';
import PropTypes from 'prop-types';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import StatusRenderer from '../StatusRenderer';
import WorkExperiencesSection from './WorkExperiences';
import Helmet from './Helmet';

const WorkExperiences = ({
  pageType,
  pageName,
  tabType,
  workExperiences,
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
        workExperiences={workExperiences}
        page={page}
      />
      <WorkExperiencesSection
        pageType={pageType}
        pageName={pageName}
        tabType={tabType}
        data={workExperiences}
        page={page}
        canViewExperienceDetail={canViewExperienceDetail}
      />
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
  canViewExperienceDetail: PropTypes.bool.isRequired,
};

export default WorkExperiences;
