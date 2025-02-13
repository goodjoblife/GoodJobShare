import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import BoxRenderer, { PageBoxRenderer } from '../StatusRenderer';
import TimeAndSalarySection from './TimeAndSalary';
import Helmet from './Helmet';
import OvertimeSection from './OvertimeSection';
import Searchbar from '../Searchbar';
import SummarySection from './SummarySection';
import EsgBlock from '../TimeAndSalary/EsgBlock';
import { pageType as PAGE_TYPE } from 'constants/companyJobTitle';
import { fetchBoxPropType } from 'utils/fetchBox';

const TimeAndSalary = ({
  pageType,
  pageName,
  tabType,
  boxSelector,
  statisticsBox,
  salaryWorkTimeStatistics,
  page,
  pageSize,
  topNJobTitles,
  esgSalaryDataBox,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    {pageType === PAGE_TYPE.COMPANY && (
      <BoxRenderer
        box={esgSalaryDataBox}
        render={data => {
          if (!data) return null;

          const {
            avgSalaryStatistics: [avgSalaryStatistics],
            nonManagerAvgSalaryStatistics: [nonManagerAvgSalaryStatistics],
            nonManagerMedianSalaryStatistics: [
              nonManagerMedianSalaryStatistics,
            ],
            femaleManagerStatistics: [femaleManagerStatistics],
          } = data;
          return (
            <EsgBlock
              avgSalaryStatistics={avgSalaryStatistics}
              nonManagerAvgSalaryStatistics={nonManagerAvgSalaryStatistics}
              nonManagerMedianSalaryStatistics={
                nonManagerMedianSalaryStatistics
              }
              femaleManagerStatistics={femaleManagerStatistics}
            />
          );
        }}
      />
    )}
    <BoxRenderer
      box={statisticsBox}
      render={({
        salaryDistribution,
        jobAverageSalaries,
        averageWeekWorkTime,
        overtimeFrequencyCount,
      }) => (
        <SummarySection
          salaryDistribution={salaryDistribution}
          jobAverageSalaries={jobAverageSalaries}
          averageWeekWorkTime={averageWeekWorkTime}
          overtimeFrequencyCount={overtimeFrequencyCount}
        />
      )}
    />
    <OvertimeSection statistics={salaryWorkTimeStatistics} />
    <Searchbar pageType={pageType} tabType={tabType} />
    <PageBoxRenderer
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
      boxSelector={boxSelector}
      render={({ salaryWorkTimes, salaryWorkTimesCount: totalCount }) => {
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
  boxSelector: PropTypes.func.isRequired,
  esgSalaryDataBox: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
  salaryWorkTimeStatistics: PropTypes.object.isRequired,
  statisticsBox: fetchBoxPropType.isRequired,
  tabType: PropTypes.string.isRequired,
  topNJobTitles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
};

export default TimeAndSalary;
