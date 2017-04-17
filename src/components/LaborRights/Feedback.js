import React from 'react';
import styles from './Feedback.module.css';

const Feedback = () => (
  <div className={styles.feedback}>
    <div className={`pM ${styles.goodjob}`}>
      <span className={styles.count}>
        108
      </span>
    </div>
    <div className={`pM ${styles.share}`}>
      <div className={`${styles.icon} ${styles.facebook}`} />
      <div className={`${styles.icon} ${styles.twitter}`} />
    </div>
  </div>
);

export default Feedback;
