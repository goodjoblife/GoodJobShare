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
  salaryWorkTimeStatistics: PropTypes.object.isRequired,
  salaryWorkTimes: PropTypes.array,
  tabType: PropTypes.string,
  totalCount: PropTypes.number.isRequired,
};

export default TimeAndSalary;
