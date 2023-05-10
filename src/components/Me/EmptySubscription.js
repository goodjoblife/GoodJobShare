import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import RoundCard from 'common/RoundCard';

import styles from './CurrentPlan.module.css';

const EmptySubscription = () => {
  return (
    <div className={styles.container}>
      <RoundCard className={styles.card}>無付費方案</RoundCard>
      <div style={{ marginTop: '32px' }}>
        <Link className={cn('buttonCircleL', 'buttonBlack')} to="/plans">
          解鎖方式
        </Link>
      </div>
    </div>
  );
};

export default EmptySubscription;
