import React from 'react';

import BarChartView from './BarChartView';
import AverageWeekWorkTimeView from './AverageWeekWorkTimeView';
import styles from './SummaryBlock.module.css';

const SummaryBlock = () => (
  <div className={styles.summaryBlock}>
    <div className={styles.barChart}>
      <BarChartView />
    </div>
    <div className={styles.averageWeekWorkTime}>
      <AverageWeekWorkTimeView />
    </div>
  </div>
);

export default SummaryBlock;
