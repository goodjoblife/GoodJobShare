import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import { BoxStatusRenderer } from '../StatusRenderer';
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
  page,
  pageSize,
  totalCount,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    <OvertimeSection statistics={salaryWorkTimeStatistics} />
    <Searchbar pageType={pageType} tabType={tabType} />
    <BoxStatusRenderer
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
      render={() => {
        return (
          <Fragment>
            <Helmet
              pageType={pageType}
              pageName={pageName}
              totalCount={totalCount}
              page={page}
            />
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
          </Fragment>
        );
      }}
    />
  </CompanyAndJobTitleWrapper>
);

TimeAndSalary.propTypes = {
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string,
  salaryWorkTimeStatistics: PropTypes.shape({
    count: PropTypes.number,
    has_compensatory_dayoff_count: PropTypes.shape({
      no: PropTypes.number.isRequired,
      unknown: PropTypes.number.isRequired,
      yes: PropTypes.number.isRequired,
    }),
    has_overtime_salary_count: PropTypes.shape({
      no: PropTypes.number.isRequired,
      unknown: PropTypes.number.isRequired,
      yes: PropTypes.number.isRequired,
    }),
    is_overtime_salary_legal_count: PropTypes.shape({
      no: PropTypes.number.isRequired,
      unknown: PropTypes.number.isRequired,
      yes: PropTypes.number.isRequired,
    }),
  }).isRequired,
  salaryWorkTimes: PropTypes.array,
  tabType: PropTypes.string,
  totalCount: PropTypes.number.isRequired,
};

export default TimeAndSalary;
