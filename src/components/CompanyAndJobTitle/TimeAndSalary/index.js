import React from 'react';
import PropTypes from 'prop-types';

import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import StatusRenderer from '../StatusRenderer';
import TimeAndSalarySection from './TimeAndSalary';

const TimeAndSalary = ({
  pageType,
  pageName,
  tabType,
  salaryWorkTimes,
  salaryWorkTimeStatistics,
  status,
  page,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    <StatusRenderer
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
      salaryWorkTimes={salaryWorkTimes}
      salaryWorkTimeStatistics={salaryWorkTimeStatistics}
      status={status}
      page={page}
    >
      {props => <TimeAndSalarySection {...props} />}
    </StatusRenderer>
  </CompanyAndJobTitleWrapper>
);

TimeAndSalary.propTypes = {
  pageType: PropTypes.string,
  pageName: PropTypes.string,
  tabType: PropTypes.string,
  salaryWorkTimes: PropTypes.array,
  salaryWorkTimeStatistics: PropTypes.shape({
    count: PropTypes.number,
    average_estimated_hourly_wage: PropTypes.number,
    average_week_work_time: PropTypes.number,
  }),
  status: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default TimeAndSalary;
