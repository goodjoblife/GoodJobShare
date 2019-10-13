import React from 'react';
import PropTypes from 'prop-types';

import BarChartView from './BarChartView';
import AverageWeekWorkTimeView from './AverageWeekWorkTimeView';
import styles from './SummaryBlock.module.css';

const SummaryBlock = ({
  jobTitleAverageSalaries,
  averageWeekWorkHours,
  frequentOverTimeRatio,
  fewOverTimeRatio,
}) => (
  <div className={styles.summaryBlock}>
    <div className={styles.barChart}>
      <BarChartView data={jobTitleAverageSalaries} />
    </div>
    <div className={styles.barChartSm}>
      <BarChartView data={jobTitleAverageSalaries} width={300} />
    </div>
    <div className={styles.averageWeekWorkTime}>
      <AverageWeekWorkTimeView
        averageWeekWorkHours={averageWeekWorkHours}
        frequentOverTimeRatio={frequentOverTimeRatio}
        fewOverTimeRatio={fewOverTimeRatio}
      />
    </div>
  </div>
);

SummaryBlock.propTypes = {
  jobTitleAverageSalaries: PropTypes.arrayOf(PropTypes.object).isRequired,
  averageWeekWorkHours: PropTypes.number.isRequired,
  frequentOverTimeRatio: PropTypes.number.isRequired,
  fewOverTimeRatio: PropTypes.number.isRequired,
};

export default SummaryBlock;
