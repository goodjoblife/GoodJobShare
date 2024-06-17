import React from 'react';
import PropTypes from 'prop-types';

import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import StatusRenderer from '../StatusRenderer';
import TimeAndSalarySection from './TimeAndSalary';
import Helmet from './Helmet';

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
    <StatusRenderer status={status}>
      <Helmet
        pageType={pageType}
        pageName={pageName}
        salaryWorkTimes={salaryWorkTimes}
        salaryWorkTimeStatistics={salaryWorkTimeStatistics}
        page={page}
      />
      <TimeAndSalarySection
        pageType={pageType}
        pageName={pageName}
        tabType={tabType}
        salaryWorkTimes={salaryWorkTimes}
        salaryWorkTimeStatistics={salaryWorkTimeStatistics}
        page={page}
      />
    </StatusRenderer>
  </CompanyAndJobTitleWrapper>
);

TimeAndSalary.propTypes = {
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string,
  pageType: PropTypes.string,
  salaryWorkTimeStatistics: PropTypes.shape({
    average_estimated_hourly_wage: PropTypes.number,
    average_week_work_time: PropTypes.number,
    count: PropTypes.number,
  }),
  salaryWorkTimes: PropTypes.array,
  status: PropTypes.string.isRequired,
  tabType: PropTypes.string,
};

export default TimeAndSalary;
