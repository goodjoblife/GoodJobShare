import React from 'react';
import PropTypes from 'prop-types';

import SalaryDistributionChart from '../../common/Charts/SalaryDistributionChart';
import JobTitleDistrubitionChart from '../../common/Charts/JobTitleDistrubitionChart';
import AverageWeekWorkTimeView from './AverageWeekWorkTimeView';
import styles from './SummaryBlock.module.css';

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
          <JobTitleDistrubitionChart data={jobAverageSalaries} />
        </div>
        <div className={styles.barChartSm}>
          <JobTitleDistrubitionChart data={jobAverageSalaries} />
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
  salaryDistribution: PropTypes.arrayOf(PropTypes.object),
  jobAverageSalaries: PropTypes.arrayOf(PropTypes.object),
  averageWeekWorkTime: PropTypes.number.isRequired,
  overtimeFrequencyCount: PropTypes.object.isRequired,
};

export default SummaryBlock;
