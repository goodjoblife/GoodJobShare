import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import Card from 'common/Card';
import AverageWeekWorkTimeView from './AverageWeekWorkTimeView';
import styles from './SummaryBlock.module.css';
import useMobile from 'hooks/useMobile';

const SalaryDistributionChart = loadable(() =>
  import('common/Charts/SalaryDistributionChart'),
);
const JobTitleDistributionChart = loadable(() =>
  import('common/Charts/JobTitleDistributionChart'),
);

const ChartCard = ({ children }) => {
  const isMobile = useMobile();
  const barCardStyle = isMobile ? styles.barChartSm : styles.barChart;
  return <Card className={barCardStyle}>{children}</Card>;
};

ChartCard.propTypes = {
  children: PropTypes.node,
};

const SummaryBlock = ({
  salaryDistribution,
  jobAverageSalaries,
  averageWeekWorkTime,
  overtimeFrequencyCount,
}) => (
  <div className={styles.summaryBlock}>
    <ChartCard>
      {salaryDistribution && (
        <SalaryDistributionChart data={salaryDistribution} />
      )}
      {jobAverageSalaries && (
        <JobTitleDistributionChart data={jobAverageSalaries} />
      )}
    </ChartCard>
    <Card className={styles.averageWeekWorkTime}>
      <AverageWeekWorkTimeView
        averageWeekWorkTime={averageWeekWorkTime}
        overtimeFrequencyCount={overtimeFrequencyCount}
      />
    </Card>
  </div>
);

SummaryBlock.propTypes = {
  averageWeekWorkTime: PropTypes.number.isRequired,
  jobAverageSalaries: PropTypes.arrayOf(PropTypes.object),
  overtimeFrequencyCount: PropTypes.object.isRequired,
  salaryDistribution: PropTypes.arrayOf(PropTypes.object),
};

export default SummaryBlock;
