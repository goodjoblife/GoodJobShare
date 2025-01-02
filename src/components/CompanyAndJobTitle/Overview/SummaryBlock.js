import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

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
        <div className={styles.barChart}>
          <SalaryDistributionChart data={salaryDistribution} />
        </div>
        <div className={styles.barChartSm}>
          <SalaryDistributionChart data={salaryDistribution} />
        </div>
      </React.Fragment>
    )}
    {jobAverageSalaries && (
      <React.Fragment>
        <div className={styles.barChart}>
          <JobTitleDistributionChart data={jobAverageSalaries} />
        </div>
        <div className={styles.barChartSm}>
          <JobTitleDistributionChart data={jobAverageSalaries} />
        </div>
      </React.Fragment>
    )}
    <div className={styles.averageWeekWorkTime}>
      <AverageWeekWorkTimeView
        averageWeekWorkTime={averageWeekWorkTime}
        overtimeFrequencyCount={overtimeFrequencyCount}
      />
    </div>
  </div>
);

SummaryBlock.propTypes = {
  averageWeekWorkTime: PropTypes.number.isRequired,
  jobAverageSalaries: PropTypes.arrayOf(PropTypes.object),
  overtimeFrequencyCount: PropTypes.object.isRequired,
  salaryDistribution: PropTypes.arrayOf(PropTypes.object),
};

export default SummaryBlock;
