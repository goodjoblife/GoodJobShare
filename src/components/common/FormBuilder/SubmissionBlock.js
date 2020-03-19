import React from 'react';
import PropTypes from 'prop-types';

import styles from './SubmissionBlock.module.css';

const SubmissionBlock = ({ isSubmittable }) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} disabled={!isSubmittable}>
        送出資料並解鎖
      </button>
      <div className={styles.privacyPolicy}>
        我分享的是真實資訊，並遵守中華民國法令，以及本站使用者條款
      </div>
    </div>
  );
};

SubmissionBlock.propTypes = { isSubmittable: PropTypes.bool.isRequired };

export default SubmissionBlock;
