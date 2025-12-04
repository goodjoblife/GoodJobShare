import React from 'react';
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
import { Wrapper } from 'common/base';
import styles from './TimeAndSalary.module.css';

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
  onCloseReport,
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
            avgSalaryStatistics: [avgSalaryStatisticsItem],
            nonManagerAvgSalaryStatistics: [nonManagerAvgSalaryStatisticsItem],
            nonManagerMedianSalaryStatistics: [
              nonManagerMedianSalaryStatisticsItem,
            ],
            femaleManagerStatistics: [femaleManagerStatisticsItem],
          } = data;
          return (
            <Wrapper size="l">
              <EsgBlock
                avgSalaryStatisticsItem={avgSalaryStatisticsItem}
                nonManagerAvgSalaryStatisticsItem={
                  nonManagerAvgSalaryStatisticsItem
                }
                nonManagerMedianSalaryStatisticsItem={
                  nonManagerMedianSalaryStatisticsItem
                }
                femaleManagerStatisticsItem={femaleManagerStatisticsItem}
              />
            </Wrapper>
          );
        }}
      />
    )}
    <BoxRenderer
      box={statisticsBox}
      render={data => {
        if (!data || salaryWorkTimeStatistics.count === 0) {
          return null;
        }
        const {
          salaryDistribution,
          jobAverageSalaries,
          averageWeekWorkTime,
          overtimeFrequencyCount,
        } = data;
        return (
          <Wrapper size="l">
            <SummarySection
              salaryDistribution={salaryDistribution}
              jobAverageSalaries={jobAverageSalaries}
              averageWeekWorkTime={averageWeekWorkTime}
              overtimeFrequencyCount={overtimeFrequencyCount}
            />
            <OvertimeSection statistics={salaryWorkTimeStatistics} />
          </Wrapper>
        );
      }}
    />
    <Wrapper size="l" className={styles.searchbar}>
      <Searchbar pageType={pageType} tabType={tabType} />
    </Wrapper>
    <PageBoxRenderer
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
      boxSelector={boxSelector}
      render={({ salaryWorkTimes, salaryWorkTimesCount: totalCount }) => {
        return (
          <Wrapper size="l">
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
              onCloseReport={onCloseReport}
            />
          </Wrapper>
        );
      }}
    />
  </CompanyAndJobTitleWrapper>
);

TimeAndSalary.propTypes = {
  boxSelector: PropTypes.func.isRequired,
  esgSalaryDataBox: PropTypes.object.isRequired,
  onCloseReport: PropTypes.func.isRequired,
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
