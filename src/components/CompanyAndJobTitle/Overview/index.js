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
  jobTitleAverageSalaries,
  frequentOverTimeRatio,
  fewOverTimeRatio,
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
        salaryWorkTimeStatistics={salaryWorkTimeStatistics}
        jobTitleAverageSalaries={jobTitleAverageSalaries}
        frequentOverTimeRatio={frequentOverTimeRatio}
        fewOverTimeRatio={fewOverTimeRatio}
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
  salaryWorkTimeStatistics: PropTypes.object,
  jobTitleAverageSalaries: PropTypes.arrayOf(PropTypes.object),
  frequentOverTimeRatio: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  canViewTimeAndSalary: PropTypes.bool.isRequired,
  canViewExperienceDetail: PropTypes.bool.isRequired,
};

export default Overview;
