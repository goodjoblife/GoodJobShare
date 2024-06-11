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
        workExperiences={workExperiences}
        page={page}
      />
      <WorkExperiencesSection
        pageType={pageType}
        pageName={pageName}
        tabType={tabType}
        data={workExperiences}
        page={page}
        canView={canView}
      />
    </StatusRenderer>
  </CompanyAndJobTitleWrapper>
);

WorkExperiences.propTypes = {
  canView: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string,
  pageType: PropTypes.string,
  status: PropTypes.string.isRequired,
  tabType: PropTypes.string,
  workExperiences: PropTypes.arrayOf(PropTypes.object),
};

export default WorkExperiences;
