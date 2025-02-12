import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import { BoxStatusRenderer } from '../StatusRenderer';
import TimeAndSalarySection from './TimeAndSalary';
import Helmet from './Helmet';
import OvertimeSection from './OvertimeSection';
import Searchbar from '../Searchbar';
import SummarySection from './SummarySection';
import EsgBlock from '../TimeAndSalary/EsgBlock';
import { pageType as PAGE_TYPE } from 'constants/companyJobTitle';

const TimeAndSalary = ({
  pageType,
  pageName,
  tabType,
  salaryWorkTimes,
  salaryWorkTimeStatistics,
  salaryDistribution,
  jobAverageSalaries,
  averageWeekWorkTime,
  overtimeFrequencyCount,
  page,
  pageSize,
  totalCount,
  topNJobTitles,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    {pageType === PAGE_TYPE.COMPANY && <EsgBlock />}
    <SummarySection
      salaryDistribution={salaryDistribution}
      jobAverageSalaries={jobAverageSalaries}
      averageWeekWorkTime={averageWeekWorkTime}
      overtimeFrequencyCount={overtimeFrequencyCount}
    />
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
              topNJobTitles={topNJobTitles}
            />
            <TimeAndSalarySection
              pageType={pageType}
              pageName={pageName}
              tabType={tabType}
              salaryWorkTimes={salaryWorkTimes}
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
  averageWeekWorkTime: PropTypes.number.isRequired,
  jobAverageSalaries: PropTypes.arrayOf(PropTypes.object),
  overtimeFrequencyCount: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
  salaryDistribution: PropTypes.array,
  salaryWorkTimeStatistics: PropTypes.object.isRequired,
  salaryWorkTimes: PropTypes.array,
  tabType: PropTypes.string.isRequired,
  topNJobTitles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
  totalCount: PropTypes.number.isRequired,
};

export default TimeAndSalary;
