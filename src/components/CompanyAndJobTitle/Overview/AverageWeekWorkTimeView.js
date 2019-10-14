import React from 'react';
import PropTypes from 'prop-types';

import styles from './SummaryBlock.module.css';

const AverageWeekWorkTimeView = ({
  averageWeekWorkTime,
  frequentOverTimeRatio,
  fewOverTimeRatio,
}) => (
  <div className={styles.averageWeekWorkTimeView}>
    <span className={styles.title}>平均每週上班</span>
    <span className={styles.body}>
      <em>{averageWeekWorkTime}</em>小時
    </span>
    <span className={styles.footer}>
      {(frequentOverTimeRatio * 100).toFixed(0)}% 幾乎每天加班，
      {(fewOverTimeRatio * 100).toFixed(0)}% 偶爾加班
    </span>
  </div>
);

AverageWeekWorkTimeView.propTypes = {
  averageWeekWorkTime: PropTypes.number.isRequired,
  frequentOverTimeRatio: PropTypes.number.isRequired,
  fewOverTimeRatio: PropTypes.number.isRequired,
};

export default AverageWeekWorkTimeView;
