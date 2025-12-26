import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import styles from './SummaryBlock.module.css';

const ratioSelectorOfType = type =>
  R.converge(R.divide, [
    R.prop(type),
    R.compose(
      R.sum,
      R.values,
    ),
  ]);

const almostEverydayRatioSelector = ratioSelectorOfType('almost_everyday');
const sometimesRatioSelector = ratioSelectorOfType('sometimes');

const AverageWeekWorkTimeView = ({
  averageWeekWorkTime,
  overtimeFrequencyCount,
}) => (
  <div className={styles.averageWeekWorkTimeView}>
    <span className={styles.title}>平均每週上班</span>
    <span className={styles.body}>
      <em>{averageWeekWorkTime.toFixed(0)}</em>小時
    </span>
    <span className={styles.footer}>
      {(almostEverydayRatioSelector(overtimeFrequencyCount) * 100).toFixed(0)}%
      幾乎每天加班，
      {(sometimesRatioSelector(overtimeFrequencyCount) * 100).toFixed(0)}%
      偶爾加班
    </span>
  </div>
);

AverageWeekWorkTimeView.propTypes = {
  averageWeekWorkTime: PropTypes.number.isRequired,
  overtimeFrequencyCount: PropTypes.shape({
    almost_everyday: PropTypes.number,
    seldom: PropTypes.number,
    sometimes: PropTypes.number,
    usually: PropTypes.number,
  }).isRequired,
};

export default AverageWeekWorkTimeView;
