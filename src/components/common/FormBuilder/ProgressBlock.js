import React from 'react';
import PropTypes from 'prop-types';

import styles from './ProgressBlock.module.css';

const ProgressBar = ({ progress }) => (
  <div className={styles.progressBar}>
    <div
      className={styles.done}
      style={{
        width: `${progress * 100}%`,
      }}
    ></div>
  </div>
);

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

const ProgressBlock = ({ page, totalPages }) => (
  <div className={styles.container}>
    <div className={styles.label}>
      問題 {page + 1} / {totalPages}
    </div>
    <ProgressBar progress={(page + 1) / totalPages} />
  </div>
);

ProgressBlock.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default ProgressBlock;
