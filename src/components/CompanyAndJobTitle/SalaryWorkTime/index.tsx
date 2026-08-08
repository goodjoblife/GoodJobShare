import React from 'react';

import { OvertimeStats } from 'apis/salaryWorkTime';
import { Wrapper } from 'common/base';
import { useCreatePageLinkTo } from 'common/Pagination/Pagination';
import BoxRenderer, { BoxesRenderer } from 'common/StatusRenderer';
import { PageType } from 'constants/companyJobTitle';
import { RootState } from 'reducers';
import {
  CompanyOverviewStatistics,
  CompanySalaryWorkTimeResult,
} from 'reducers/companyIndex';
import {
  JobTitleOverviewStatistics,
  JobTitleSalaryWorkTimeResult,
} from 'reducers/jobTitleIndex';
import { EsgYearStatistics } from 'utils/esgYearUtils';
import FetchBox from 'utils/fetchBox';

import SummaryBlock from '../Overview/SummaryBlock';
import PageBoxRenderer from '../PageBoxRenderer';
import { usePageContext } from '../PageContextProvider';
import EsgBlock from './EsgBlock';
import Helmet from './Helmet';
import OvertimeSection from './OvertimeSection';
import SalaryFilter from './SalaryFilter';
import SalaryWorkTimeSection from './SalaryWorkTimeSection';
import SearchBar from '../SearchBar';
import styles from './SalaryWorkTime.module.css';
import SnippetBlock from '../SnippetBlock';

type SalaryWorkTimePageData = Pick<
  CompanySalaryWorkTimeResult | JobTitleSalaryWorkTimeResult,
  'name' | 'salaryWorkTimes' | 'salaryWorkTimesCount'
>;

type Props = {
  boxSelector: (state: RootState) => FetchBox<SalaryWorkTimePageData | null>;
  statisticsBox: FetchBox<
    CompanyOverviewStatistics | JobTitleOverviewStatistics | null
  >;
  salaryWorkTimeStatisticsBox: FetchBox<OvertimeStats | null>;
  page: number;
  pageSize: number;
  topNJobTitles?: { name: string }[];
  onCloseReport: () => void;
  esgSalaryDataBox: FetchBox<EsgYearStatistics[] | null>;
};

const SalaryWorkTime: React.FC<Props> = ({
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
  const { pageType, pageName, tabType } = usePageContext();

  return (
    <>
      {pageType === PageType.COMPANY && (
        <BoxRenderer
          box={esgSalaryDataBox}
          render={(data): React.ReactNode => {
            const latestYearData = data && data[0];
            if (!latestYearData) return null;
            return (
              <Wrapper size="l">
                <EsgBlock data={latestYearData} />
              </Wrapper>
            );
          }}
        />
      )}
      <BoxesRenderer
        boxes={[statisticsBox, salaryWorkTimeStatisticsBox]}
        render={([statisticsData, overtimeStatisticsData]): React.ReactNode => {
          if (
            !statisticsData ||
            !overtimeStatisticsData ||
            overtimeStatisticsData.count === 0
          )
            return null;
          return (
            <Wrapper size="l">
              <SnippetBlock
                title="本站使用者分享之薪資、加班資訊"
                pageName={pageName}
              >
                <SummaryBlock {...statisticsData} />
              </SnippetBlock>
              <OvertimeSection statistics={overtimeStatisticsData} />
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
          }): React.ReactNode => {
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
    </>
  );
};

export default SalaryWorkTime;
