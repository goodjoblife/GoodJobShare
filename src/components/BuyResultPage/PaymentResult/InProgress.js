import React from 'react';

import P from 'common/base/P';

import styles from './PaymentResult.module.css';

const InProgress = () => {
  return (
    <div className={styles.content}>
      <div className={styles.icon}></div>
      <P className={styles.description}>交易確認中，請勿離開，至多 29 秒...</P>
    </div>
  );
};

export default InProgress;
