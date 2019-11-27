import React from 'react';
import PropTypes from 'prop-types';

import JobTitleDistrubitionChart from '../../common/Charts/JobTitleDistrubitionChart';
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
          <JobTitleDistrubitionChart data={jobTitleAverageSalaries} />
        </div>
        <div className={styles.barChartSm}>
          <JobTitleDistrubitionChart
            data={jobTitleAverageSalaries}
            width={300}
          />
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
