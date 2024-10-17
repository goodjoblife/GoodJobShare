import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import { BoxStatusRenderer } from '../StatusRenderer';
import WorkExperiencesSection from './WorkExperiences';
import Helmet from './Helmet';
import Searchbar from '../Searchbar';

const WorkExperiences = ({
  pageType,
  pageName,
  tabType,
  workExperiences,
  page,
  pageSize,
  totalCount,
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
            <Helmet
              pageType={pageType}
              pageName={pageName}
              totalCount={totalCount}
              page={page}
            />
            <WorkExperiencesSection
              pageType={pageType}
              pageName={pageName}
              tabType={tabType}
              data={workExperiences}
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

WorkExperiences.propTypes = {
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
  workExperiences: PropTypes.arrayOf(PropTypes.object),
};

export default WorkExperiences;
