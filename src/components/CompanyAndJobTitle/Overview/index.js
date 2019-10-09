import React from 'react';
import PropTypes from 'prop-types';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import OverviewSection from './Overview';

const Overview = ({
  pageType,
  pageName,
  tabType,
  interviewExperiences,
  workExperiences,
  salaryWorkTimes,
  salaryWorkTimeStatistics,
  crossComparisonSalaryStatistics,
  averageWeekWorkHours,
  frequentOverTimeRatio,
  fewOverTimeRatio,
  status,
  page,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    {status === 'FETCHED' && (
      <OverviewSection
        pageType={pageType}
        pageName={pageName}
        tabType={tabType}
        interviewExperiences={interviewExperiences}
        workExperiences={workExperiences}
        salaryWorkTimes={salaryWorkTimes}
        salaryWorkTimeStatistics={salaryWorkTimeStatistics}
        crossComparisonSalaryStatistics={crossComparisonSalaryStatistics}
        averageWeekWorkHours={averageWeekWorkHours}
        frequentOverTimeRatio={frequentOverTimeRatio}
        fewOverTimeRatio={fewOverTimeRatio}
        page={page}
      />
    )}
  </CompanyAndJobTitleWrapper>
);

Overview.propTypes = {
  pageType: PropTypes.string,
  pageName: PropTypes.string,
  tabType: PropTypes.string,
  interviewExperiences: PropTypes.arrayOf(PropTypes.object),
  workExperiences: PropTypes.arrayOf(PropTypes.object),
  salaryWorkTimes: PropTypes.arrayOf(PropTypes.object),
  salaryWorkTimeStatistics: PropTypes.object,
  crossComparisonSalaryStatistics: PropTypes.arrayOf(PropTypes.object),
  averageWeekWorkHours: PropTypes.number.isRequired,
  frequentOverTimeRatio: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default Overview;
