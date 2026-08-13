import loadable from '@loadable/component';
import cn from 'classnames';
import React from 'react';

import {
  JobAverageSalary,
  OvertimeFrequencyCount,
  SalaryDistributionBin,
} from 'apis/salaryWorkTime';
import Card from 'common/Card';
import { Aspect, PageType } from 'constants/companyJobTitle';
import useMobile from 'hooks/useMobile';

import AspectScoreCard from '../AspectScoreCard';
import { usePageContext } from '../PageContextProvider';
import AverageWeekWorkTimeView from './AverageWeekWorkTimeView';
import emptySalaryImage from './empty_data_salary.png';
import emptyWorkTimeImage from './empty_data_working_time.png';
import styles from './SummaryBlock.module.css';

const SalaryDistributionChart = loadable(() =>
  import('common/Charts/SalaryDistributionChart'),
);
const JobTitleDistributionChart = loadable(() =>
  import('common/Charts/JobTitleDistributionChart'),
);

type ChartCardProps = {
  data: SalaryDistributionBin[] | JobAverageSalary[] | undefined;
  children: React.ReactNode;
};

const ChartCard: React.FC<ChartCardProps> = ({ data, children }) => {
  const isMobile = useMobile();
  const barCardStyle = isMobile ? styles.barChartSm : styles.barChart;
  const isEmptyData = !data || data.length === 0;
  return (
    <Card
      className={cn(styles.card, barCardStyle, {
        [styles.emptyData]: isEmptyData,
      })}
    >
      {isEmptyData ? (
        <img
          className={styles.barCardImage}
          src={emptySalaryImage}
          alt="無薪資資料"
        />
      ) : (
        children
      )}
    </Card>
  );
};

type WorkTimeCardProps = {
  data: OvertimeFrequencyCount | null;
  children: React.ReactNode;
};

const WorkTimeCard: React.FC<WorkTimeCardProps> = ({ data, children }) => {
  const isEmptyData = !data;
  return (
    <Card
      className={cn(styles.card, styles.scoreCard, {
        [styles.emptyData]: isEmptyData,
      })}
    >
      {isEmptyData ? (
        <img
          className={styles.barCardImage}
          src={emptyWorkTimeImage}
          alt="無工時資料"
        />
      ) : (
        children
      )}
    </Card>
  );
};

// CompanyOverviewStatistics 與 JobTitleOverviewStatistics 的共同上界：
// 職稱頁有 salaryDistribution，公司頁有 jobAverageSalaries，其餘欄位相同。
// 兩者的 count 由呼叫端用來決定區塊的標題與空狀態，圖表本身用不到
type SummaryBlockProps = {
  salaryDistribution?: SalaryDistributionBin[];
  jobAverageSalaries?: JobAverageSalary[];
  averageWeekWorkTime: number;
  overtimeFrequencyCount: OvertimeFrequencyCount | null;
};

// 第三張卡是面向評分，只有公司才有，職稱頁不顯示
const SummaryBlock: React.FC<SummaryBlockProps> = ({
  salaryDistribution,
  jobAverageSalaries,
  averageWeekWorkTime,
  overtimeFrequencyCount,
}) => {
  const { pageType } = usePageContext();

  return (
    <div className={styles.summaryBlock}>
      <ChartCard data={salaryDistribution || jobAverageSalaries}>
        {salaryDistribution && (
          <SalaryDistributionChart data={salaryDistribution} />
        )}
        {jobAverageSalaries && (
          <JobTitleDistributionChart data={jobAverageSalaries} />
        )}
      </ChartCard>
      <WorkTimeCard data={overtimeFrequencyCount}>
        <AverageWeekWorkTimeView
          averageWeekWorkTime={averageWeekWorkTime}
          overtimeFrequencyCount={overtimeFrequencyCount}
        />
      </WorkTimeCard>
      {pageType === PageType.COMPANY && (
        <AspectScoreCard aspect={Aspect.WORK_LIFE_BALANCE} />
      )}
    </div>
  );
};

export default SummaryBlock;
