import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import RoundCard from 'common/RoundCard';
import { P } from 'common/base';

import styles from './CurrentSubscription.module.css';

const EmptySubscription = () => {
  return (
    <div className={styles.container}>
      <RoundCard className={styles.card}>
        <P tag="p" size="l">
          無方案
        </P>
      </RoundCard>
      <div style={{ marginTop: '32px' }}>
        <Link className={cn('buttonCircleL', 'buttonBlack')} to="/plans">
          解鎖方式
        </Link>
      </div>
    </div>
  );
};

export default EmptySubscription;
