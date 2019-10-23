import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import styles from './SummaryBlock.module.css';

const findCountOfOvertimeFrequency = overtimeFrequency =>
  R.converge(R.divide, [
    R.compose(
      R.prop('count'),
      R.find(R.propEq('overtime_frequency', overtimeFrequency)),
    ),
    R.compose(
      R.sum,
      R.map(R.prop('count')),
    ),
  ]);

const almostEverydayOvertimeRatioSelector = findCountOfOvertimeFrequency(3);

const sometimesOvertimeRatioSelector = findCountOfOvertimeFrequency(1);

const AverageWeekWorkTimeView = ({
  averageWeekWorkTime,
  overtimeFrequencyCount,
}) => (
  <div className={styles.averageWeekWorkTimeView}>
    <span className={styles.title}>平均每週上班</span>
    <span className={styles.body}>
      <em>{averageWeekWorkTime}</em>小時
    </span>
    <span className={styles.footer}>
      {(
        almostEverydayOvertimeRatioSelector(overtimeFrequencyCount) * 100
      ).toFixed(0)}
      % 幾乎每天加班，
      {(sometimesOvertimeRatioSelector(overtimeFrequencyCount) * 100).toFixed(
        0,
      )}
      % 偶爾加班
    </span>
  </div>
);

AverageWeekWorkTimeView.propTypes = {
  averageWeekWorkTime: PropTypes.number.isRequired,
  overtimeFrequencyCount: PropTypes.arrayOf(
    PropTypes.shape({
      overtime_frequency: PropTypes.number,
      count: PropTypes.number,
    }),
  ).isRequired,
};

export default AverageWeekWorkTimeView;
