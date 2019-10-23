import React from 'react';
import PropTypes from 'prop-types';

import BarChartView from './BarChartView';
import AverageWeekWorkTimeView from './AverageWeekWorkTimeView';
import styles from './SummaryBlock.module.css';

const SummaryBlock = ({
  jobTitleAverageSalaries,
  averageWeekWorkTime,
  overtimeFrequencyCount,
}) => (
  <div className={styles.summaryBlock}>
    {jobTitleAverageSalaries && (
      <React.Fragment>
        <div className={styles.barChart}>
          <BarChartView data={jobTitleAverageSalaries} />
        </div>
        <div className={styles.barChartSm}>
          <BarChartView data={jobTitleAverageSalaries} width={300} />
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
  jobTitleAverageSalaries: PropTypes.arrayOf(PropTypes.object).isRequired,
  averageWeekWorkTime: PropTypes.number.isRequired,
  overtimeFrequencyCount: PropTypes.array.isRequired,
};

export default SummaryBlock;
