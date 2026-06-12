import PropTypes from 'prop-types';
import React from 'react';

import { Wrapper } from 'common/base';
import { useCreatePageLinkTo } from 'common/Pagination/Pagination';
import BoxRenderer from 'common/StatusRenderer';
import { PageType } from 'constants/companyJobTitle';
import { fetchBoxPropType } from 'utils/fetchBox';

import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import PageBoxRenderer from '../PageBoxRenderer';
import EsgBlock from './EsgBlock';
import Helmet from './Helmet';
import OvertimeSection from './OvertimeSection';
import SalaryFilter from './SalaryFilter';
import SalaryWorkTimeSection from './SalaryWorkTimeSection';
import SearchBar from '../SearchBar';
import styles from './SalaryWorkTime.module.css';
import SummarySection from './SummarySection';

const SalaryWorkTime = ({
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
}) => {
  const [createPageLinkTo, handleSectionRef, sectionY] = useCreatePageLinkTo();

  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
    >
      {pageType === PageType.COMPANY && (
        <BoxRenderer
          box={esgSalaryDataBox}
          render={data => {
            if (!data) return null;

            const {
              avgSalaryStatistics: [avgSalaryStatisticsItem],
              nonManagerAvgSalaryStatistics: [
                nonManagerAvgSalaryStatisticsItem,
              ],
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
      <Wrapper ref={handleSectionRef} size="l" className={styles.searchbar}>
        <SearchBar pageType={pageType} tabType={tabType} />
        <SalaryFilter y={sectionY} />
      </Wrapper>
      <Wrapper size="l">
        <PageBoxRenderer
          pageType={pageType}
          pageName={pageName}
          tabType={tabType}
          boxSelector={boxSelector}
          render={({ salaryWorkTimes, salaryWorkTimesCount: totalCount }) => {
            return (
              <>
                <Helmet
                  pageType={pageType}
                  pageName={pageName}
                  totalCount={totalCount}
                  page={page}
                  topNJobTitles={topNJobTitles}
                />
                <SalaryWorkTimeSection
                  pageType={pageType}
                  pageName={pageName}
                  tabType={tabType}
                  salaryWorkTimes={salaryWorkTimes}
                  page={page}
                  pageSize={pageSize}
                  totalCount={totalCount}
                  onCloseReport={onCloseReport}
                  createPageLinkTo={createPageLinkTo}
                />
              </>
            );
          }}
        />
      </Wrapper>
    </CompanyAndJobTitleWrapper>
  );
};

SalaryWorkTime.propTypes = {
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

export default SalaryWorkTime;
