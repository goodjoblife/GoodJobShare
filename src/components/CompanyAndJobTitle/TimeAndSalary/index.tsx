import React from 'react';

import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';
import { CompanySalaryWorkTimeStatistics } from 'apis/queryCompanySalaryWorkTimeStatistics';
import { JobTitleSalaryWorkTimeStatistics } from 'apis/queryJobTitleSalaryWorkTimeStatistics';
import { Wrapper } from 'common/base';
import { useCreatePageLinkTo } from 'common/Pagination/Pagination';
import BoxRenderer, { BoxesRenderer } from 'common/StatusRenderer';
import { PageType, TabType } from 'constants/companyJobTitle';
import { RootState } from 'reducers';
import FetchBox from 'utils/fetchBox';

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

type SalaryWorkTimePageData = {
  name: string;
  salaryWorkTimes: unknown[];
  salaryWorkTimesCount: number;
  [key: string]: unknown;
};

type Props = {
  pageType: PageType;
  pageName: string;
  tabType: TabType;
  boxSelector: (state: RootState) => FetchBox<SalaryWorkTimePageData | null>;
  statisticsBox: FetchBox<unknown>;
  salaryWorkTimeStatisticsBox: FetchBox<
    CompanySalaryWorkTimeStatistics | JobTitleSalaryWorkTimeStatistics | null
  >;
  page: number;
  pageSize: number;
  topNJobTitles?: { name: string }[];
  onCloseReport: () => void;
  esgSalaryDataBox: FetchBox<ESGSalaryData | null>;
};

const SalaryWorkTime: React.FC<Props> = ({
  pageType,
  pageName,
  tabType,
  boxSelector,
  statisticsBox,
  salaryWorkTimeStatisticsBox,
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
          render={(data): React.ReactNode => {
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
      <BoxesRenderer
        boxes={[statisticsBox, salaryWorkTimeStatisticsBox]}
        render={([
          statisticsData,
          salaryWorkTimeStatisticsData,
        ]): React.ReactNode => {
          const salaryWorkTimeStatistics =
            salaryWorkTimeStatisticsData != null
              ? salaryWorkTimeStatisticsData.salary_work_time_statistics
              : null;
          if (
            !statisticsData ||
            !salaryWorkTimeStatistics ||
            salaryWorkTimeStatistics.count === 0
          ) {
            return null;
          }
          const {
            salaryDistribution,
            jobAverageSalaries,
            averageWeekWorkTime,
            overtimeFrequencyCount,
          } = statisticsData as Record<string, unknown>;
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
      <Wrapper
        ref={handleSectionRef as React.Ref<HTMLElement>}
        size="l"
        className={styles.searchbar}
      >
        <SearchBar pageType={pageType} tabType={tabType} />
        <SalaryFilter y={sectionY as number | null} />
      </Wrapper>
      <Wrapper size="l">
        <PageBoxRenderer
          pageType={pageType}
          pageName={pageName}
          tabType={tabType}
          boxSelector={boxSelector}
          render={({
            salaryWorkTimes,
            salaryWorkTimesCount: totalCount,
          }): React.ReactNode => (
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
          )}
        />
      </Wrapper>
    </CompanyAndJobTitleWrapper>
  );
};

export default SalaryWorkTime;
