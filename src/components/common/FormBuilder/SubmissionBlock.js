import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './SubmissionBlock.module.css';

const SubmissionBlock = ({ onSubmit }) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onSubmit}>
        送出資料並解鎖
      </button>
      <div className={styles.privacyPolicy}>
        我分享的是真實資訊，並遵守中華民國法令，以及本站
        <Link className={styles.link} to="/user-terms" target="_blank">
          使用者條款
        </Link>
      </div>
    </div>
  );
};

SubmissionBlock.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SubmissionBlock;
