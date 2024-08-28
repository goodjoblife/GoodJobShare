import React from 'react';
import PropTypes from 'prop-types';

import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import StatusRenderer from '../StatusRenderer';
import TimeAndSalarySection from './TimeAndSalary';
import Helmet from './Helmet';
import OvertimeSection from './OvertimeSection';
import Searchbar from '../Searchbar';

const TimeAndSalary = ({
  pageType,
  pageName,
  tabType,
  salaryWorkTimes,
  salaryWorkTimeStatistics,
  status,
  page,
  pageSize,
  totalCount,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    <Helmet
      pageType={pageType}
      pageName={pageName}
      salaryWorkTimes={salaryWorkTimes}
      salaryWorkTimeStatistics={salaryWorkTimeStatistics}
      page={page}
    />
    <OvertimeSection statistics={salaryWorkTimeStatistics} />
    <Searchbar pageType={pageType} tabType={tabType} />
    <StatusRenderer status={status}>
      <TimeAndSalarySection
        pageType={pageType}
        pageName={pageName}
        tabType={tabType}
        salaryWorkTimes={salaryWorkTimes}
        salaryWorkTimeStatistics={salaryWorkTimeStatistics}
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
      />
    </StatusRenderer>
  </CompanyAndJobTitleWrapper>
);

TimeAndSalary.propTypes = {
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string,
  salaryWorkTimeStatistics: PropTypes.shape({
    average_week_work_time: PropTypes.number,
    count: PropTypes.number,
  }),
  salaryWorkTimes: PropTypes.array,
  status: PropTypes.string.isRequired,
  tabType: PropTypes.string,
  totalCount: PropTypes.number.isRequired,
};

export default TimeAndSalary;
