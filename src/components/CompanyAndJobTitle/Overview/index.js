import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import { BoxStatusRenderer } from '../StatusRenderer';
import OverviewSection from './Overview';
import Helmet from './Helmet';

const Overview = ({
  pageType,
  pageName,
  tabType,
  overviewBox,
  salaryDistribution,
  jobAverageSalaries,
  averageWeekWorkTime,
  overtimeFrequencyCount,
  topNJobTitles,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    <BoxStatusRenderer
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
      render={() => {
        const data = overviewBox.data;

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
              salaryDistribution={salaryDistribution}
              jobAverageSalaries={jobAverageSalaries}
              averageWeekWorkTime={averageWeekWorkTime}
              overtimeFrequencyCount={overtimeFrequencyCount}
            />
          </Fragment>
        );
      }}
    />
  </CompanyAndJobTitleWrapper>
);

Overview.propTypes = {
  averageWeekWorkTime: PropTypes.number,
  jobAverageSalaries: PropTypes.array,
  overtimeFrequencyCount: PropTypes.object,
  overviewBox: PropTypes.shape({
    data: PropTypes.shape({
      interviewExperiences: PropTypes.arrayOf(PropTypes.object).isRequired,
      interviewExperiencesCount: PropTypes.number.isRequired,
      salaryWorkTimes: PropTypes.arrayOf(PropTypes.object).isRequired,
      salaryWorkTimesCount: PropTypes.number.isRequired,
      workExperiences: PropTypes.arrayOf(PropTypes.object).isRequired,
      workExperiencesCount: PropTypes.number.isRequired,
    }),
    error: PropTypes.any,
    status: PropTypes.string.isRequired,
  }).isRequired,
  pageName: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  salaryDistribution: PropTypes.array,
  tabType: PropTypes.string.isRequired,
  topNJobTitles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
};

export default Overview;
