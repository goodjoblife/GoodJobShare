import React from 'react';

import RoundCard from 'common/RoundCard';

import styles from './CurrentPlan.module.css';

const EmptyCurrentPlan = () => {
  return (
    <div className={styles.container}>
      <RoundCard className={styles.card}>無付費方案</RoundCard>
    </div>
  );
};

export default EmptyCurrentPlan;
