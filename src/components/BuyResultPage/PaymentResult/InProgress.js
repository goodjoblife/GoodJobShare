import React, { useCallback, useState } from 'react';

import P from 'common/base/P';
import useTimer from 'hooks/useTimer';

import styles from './PaymentResult.module.css';
import { renderCountdown } from './helpers';

const waitingTime = 3000;

const InProgress = () => {
  const [counting, setCounting] = useState(true);

  const action = useCallback(async () => {
    setCounting(false);
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('hits');
        resolve();
      }, 5000);
    }).then(() => {
      setCounting(true);
    });
  }, []);

  const { duration } = useTimer(action, waitingTime, counting);

  const countdown = renderCountdown(waitingTime, duration);

  return (
    <div className={styles.content}>
      <div className={styles.icon}></div>
      <P className={styles.description}>
        {`交易確認中，請勿離開，至多 ${countdown} 秒...`}
      </P>
    </div>
  );
};

export default InProgress;
