import React, { PropTypes } from 'react';
import styles from './ProgressBar.module.css';

const goalData = 500;

const ProgressBar = ({
  totalData,
}) => {
  const percentage = `${(totalData / goalData) * 100}%`;
  return (
    <div className={styles.root}>
      <div className={styles.start}>0</div>
      <div className={styles.progress}>
        <div className={styles.bar} style={{ width: percentage }}>
          <span className={styles.totalData}>{totalData}</span>
        </div>
      </div>
      <div className={styles.end}>{goalData}</div>
    </div>
  );
};
ProgressBar.propTypes = {
  totalData: PropTypes.number.isRequired,
};
ProgressBar.defaultProps = {
  totalData: 0,
};

export default ProgressBar;
