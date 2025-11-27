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

export const AbstractView = ({ title, value, valueSuffix, footer }) => (
  <div className={styles.averageWeekWorkTimeView}>
    <span className={styles.title}>{title}</span>
    <span className={styles.body}>
      <em>{value}</em>
      {valueSuffix}
    </span>
    {<span className={styles.footer}>{footer || '　'}</span>}
  </div>
);

AbstractView.propTypes = {
  footer: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  valueSuffix: PropTypes.string.isRequired,
};

const AverageWeekWorkTimeView = ({
  averageWeekWorkTime,
  overtimeFrequencyCount,
}) => (
  <AbstractView
    title="平均每週上班"
    value={averageWeekWorkTime.toFixed(0)}
    valueSuffix="小時"
    footer={`${(
      almostEverydayRatioSelector(overtimeFrequencyCount) * 100
    ).toFixed(0)}% 幾乎每天加班，${(
      sometimesRatioSelector(overtimeFrequencyCount) * 100
    ).toFixed(0)}% 偶爾加班`}
  />
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
