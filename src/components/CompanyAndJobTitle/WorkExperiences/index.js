import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'common/Pagination';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import WorkExperiencesSection from './WorkExperiences';
import { isFetched } from '../../../constants/status';

const pageSize = 10;

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
    <WorkExperiencesSection
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
      data={
        workExperiences &&
        workExperiences.slice((page - 1) * pageSize, page * pageSize)
      }
      status={status}
    />
    {isFetched(status) && (
      <Pagination
        totalCount={workExperiences.length}
        unit={pageSize}
        currentPage={page}
        createPageLinkTo={page => `?p=${page}`}
      />
    )}
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
