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
      <AverageWeekWorkTimeView
        averageWeekWorkHours={45}
        frequentOverTimeRatio={0.6}
        fewOverTimeRatio={0.2}
      />
    </div>
  </div>
);

export default SummaryBlock;
