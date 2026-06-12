import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { Wrapper } from 'common/base';
import { useCreatePageLinkTo } from 'common/Pagination/Pagination';

import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import PageBoxRenderer from '../PageBoxRenderer';
import Helmet from './Helmet';
import WorkExperiencesSection from './WorkExperiences';
import SearchBar from '../SearchBar';
import Sorter from '../Sorter';
import styles from '../styles.module.css';

const WorkExperiences = ({
  pageType,
  pageName,
  tabType,
  boxSelector,
  page,
  pageSize,
}) => {
  const [createPageLinkTo, handleSectionRef] = useCreatePageLinkTo();

  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
    >
      <Wrapper ref={handleSectionRef} size="m">
        <div className={styles.interactive}>
          <SearchBar pageType={pageType} tabType={tabType} />
          <Sorter />
        </div>
      </Wrapper>
      <Wrapper size="m">
        <PageBoxRenderer
          pageType={pageType}
          pageName={pageName}
          tabType={tabType}
          boxSelector={boxSelector}
          render={({ workExperiences, workExperiencesCount: totalCount }) => {
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
                  createPageLinkTo={createPageLinkTo}
                />
              </Fragment>
            );
          }}
        />
      </Wrapper>
    </CompanyAndJobTitleWrapper>
  );
};

WorkExperiences.propTypes = {
  boxSelector: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
};

export default WorkExperiences;
