import React from 'react';
import PropTypes from 'prop-types';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import { PageBoxRenderer } from '../StatusRenderer';
import OverviewSection from './Overview';
import Helmet from './Helmet';
import { fetchBoxPropType } from 'utils/fetchBox';
import { Wrapper } from 'common/base';

const Overview = ({
  pageType,
  pageName,
  tabType,
  boxSelector,
  statisticsBox,
  topNJobTitles,
  onCloseReport,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    <Wrapper size="l">
      <PageBoxRenderer
        pageType={pageType}
        pageName={pageName}
        tabType={tabType}
        boxSelector={boxSelector}
        render={data => {
          return (
            <>
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
                onCloseReport={onCloseReport}
              />
            </>
          );
        }}
      />
    </Wrapper>
  </CompanyAndJobTitleWrapper>
);

Overview.propTypes = {
  boxSelector: PropTypes.func.isRequired,
  onCloseReport: PropTypes.func.isRequired,
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
