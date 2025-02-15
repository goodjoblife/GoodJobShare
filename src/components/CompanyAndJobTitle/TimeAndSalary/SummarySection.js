import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import SummaryBlock from '../Overview/SummaryBlock';
import styles from '../Overview/Overview.module.css';

const SummarySection = ({
  salaryDistribution,
  jobAverageSalaries,
  averageWeekWorkTime,
  overtimeFrequencyCount,
}) => {
  return (
    <div className={styles.snippet}>
      <h2 className={cn(styles.title, styles.aboveCard)}>
        本站使用者分享之薪資、加班資訊
      </h2>
      <SummaryBlock
        salaryDistribution={salaryDistribution}
        jobAverageSalaries={jobAverageSalaries}
        averageWeekWorkTime={averageWeekWorkTime}
        overtimeFrequencyCount={overtimeFrequencyCount}
      />
    </div>
  );
};

SummarySection.propTypes = {
  averageWeekWorkTime: PropTypes.number.isRequired,
  jobAverageSalaries: PropTypes.array,
  overtimeFrequencyCount: PropTypes.object.isRequired,
  salaryDistribution: PropTypes.array,
};

export default SummarySection;
