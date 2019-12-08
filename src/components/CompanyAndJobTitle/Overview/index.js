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
  salaryDistribution,
  jobAverageSalaries,
  averageWeekWorkTime,
  overtimeFrequencyCount,
  status,
  page,
  canViewTimeAndSalary,
  canViewExperienceDetail,
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
        salaryDistribution={salaryDistribution}
        jobAverageSalaries={jobAverageSalaries}
        averageWeekWorkTime={averageWeekWorkTime}
        overtimeFrequencyCount={overtimeFrequencyCount}
        page={page}
        canViewTimeAndSalary={canViewTimeAndSalary}
        canViewExperienceDetail={canViewExperienceDetail}
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
  salaryDistribution: PropTypes.array,
  jobAverageSalaries: PropTypes.array,
  averageWeekWorkTime: PropTypes.number.isRequired,
  overtimeFrequencyCount: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  canViewTimeAndSalary: PropTypes.bool.isRequired,
  canViewExperienceDetail: PropTypes.bool.isRequired,
};

export default Overview;
