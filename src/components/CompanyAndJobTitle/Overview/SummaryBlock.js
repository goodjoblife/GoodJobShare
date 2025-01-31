import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import Card from 'common/Card';
import AverageWeekWorkTimeView from './AverageWeekWorkTimeView';
import styles from './SummaryBlock.module.css';

const SalaryDistributionChart = loadable(() =>
  import('common/Charts/SalaryDistributionChart'),
);
const JobTitleDistributionChart = loadable(() =>
  import('common/Charts/JobTitleDistributionChart'),
);

const SummaryBlock = ({
  salaryDistribution,
  jobAverageSalaries,
  averageWeekWorkTime,
  overtimeFrequencyCount,
}) => (
  <div className={styles.summaryBlock}>
    {salaryDistribution && (
      <React.Fragment>
        <Card className={styles.barChart}>
          <SalaryDistributionChart data={salaryDistribution} />
        </Card>
        <Card className={styles.barChartSm}>
          <SalaryDistributionChart data={salaryDistribution} />
        </Card>
      </React.Fragment>
    )}
    {jobAverageSalaries && (
      <React.Fragment>
        <Card className={styles.barChart}>
          <JobTitleDistributionChart data={jobAverageSalaries} />
        </Card>
        <Card className={styles.barChartSm}>
          <JobTitleDistributionChart data={jobAverageSalaries} />
        </Card>
      </React.Fragment>
    )}
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
