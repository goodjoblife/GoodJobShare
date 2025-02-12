import React from 'react';
import PropTypes from 'prop-types';

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
      <h2 className={styles.title}>薪水&加班狀況</h2>
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
