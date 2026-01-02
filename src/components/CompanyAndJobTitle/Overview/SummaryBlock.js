import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import loadable from '@loadable/component';

import Card from 'common/Card';
import AverageWeekWorkTimeView from './AverageWeekWorkTimeView';
import styles from './SummaryBlock.module.css';
import useMobile from 'hooks/useMobile';

import emptySalaryImage from './empty_data_salary.png';
import emptyWorkTimeImage from './empty_data_working_time.png';
import { WorkLifeBalanceCard } from './ScoreCard';

const SalaryDistributionChart = loadable(() =>
  import('common/Charts/SalaryDistributionChart'),
);
const JobTitleDistributionChart = loadable(() =>
  import('common/Charts/JobTitleDistributionChart'),
);

const ChartCard = ({ data, children }) => {
  const isMobile = useMobile();
  const barCardStyle = isMobile ? styles.barChartSm : styles.barChart;
  const isEmptyData = data.length === 0;
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

ChartCard.propTypes = {
  children: PropTypes.node,
  data: PropTypes.arrayOf(PropTypes.object),
};

const WorkTimeCard = ({ data, children }) => {
  const isEmptyData = !data;
  return (
    <Card
      className={cn(styles.card, styles.averageWeekWorkTime, {
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

WorkTimeCard.propTypes = {
  children: PropTypes.node,
  data: PropTypes.object,
};

const SummaryBlock = ({
  salaryDistribution,
  jobAverageSalaries,
  averageWeekWorkTime,
  overtimeFrequencyCount,
}) => (
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
    <WorkLifeBalanceCard />
  </div>
);

SummaryBlock.propTypes = {
  averageWeekWorkTime: PropTypes.number.isRequired,
  jobAverageSalaries: PropTypes.arrayOf(PropTypes.object),
  overtimeFrequencyCount: PropTypes.object.isRequired,
  salaryDistribution: PropTypes.arrayOf(PropTypes.object),
};

export default SummaryBlock;
