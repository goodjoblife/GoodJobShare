import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import { PageBoxRenderer } from '../StatusRenderer';
import OverviewSection from './Overview';
import Helmet from './Helmet';
import { fetchBoxPropType } from 'utils/fetchBox';

const Overview = ({
  pageType,
  pageName,
  tabType,
  boxSelector,
  statisticsBox,
  topNJobTitles,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    <PageBoxRenderer
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
      boxSelector={boxSelector}
      render={data => {
        return (
          <Fragment>
            <Helmet
              pageType={pageType}
              pageName={pageName}
              interviewExperiencesCount={data.interviewExperiencesCount}
              workExperiencesCount={data.workExperiencesCount}
              salaryWorkTimesCount={data.salaryWorkTimesCount}
              topNJobTitles={topNJobTitles}
            />
            <OverviewSection
              pageType={pageType}
              pageName={pageName}
              interviewExperiences={data.interviewExperiences}
              interviewExperiencesCount={data.interviewExperiencesCount}
              workExperiences={data.workExperiences}
              workExperiencesCount={data.workExperiencesCount}
              salaryWorkTimes={data.salaryWorkTimes}
              salaryWorkTimesCount={data.salaryWorkTimesCount}
              statisticsBox={statisticsBox}
            />
          </Fragment>
        );
      }}
    />
  </CompanyAndJobTitleWrapper>
);

Overview.propTypes = {
  boxSelector: PropTypes.func.isRequired,
  pageName: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  statisticsBox: fetchBoxPropType.isRequired,
  tabType: PropTypes.string.isRequired,
  topNJobTitles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
};

export default Overview;
