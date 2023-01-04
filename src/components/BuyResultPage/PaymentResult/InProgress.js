import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import P from 'common/base/P';
import useTimer from 'hooks/useTimer';
import useFetchPaymentRecord from 'hooks/payment/useFetchPaymentRecord';
import fetchingStatusMap from 'constants/status';

import styles from './PaymentResult.module.css';
import { renderCountdown } from './helpers';

const waitingTime = 3000;
const timeLimit = 30000;

const InProgress = ({ paymentRecordId, fetchingStatus }) => {
  const [counting, setCounting] = useState(true);
  const [isTimerEnabled, setIsTimerEnabled] = useState(true);
  const fetch = useFetchPaymentRecord(paymentRecordId);

  useEffect(() => {
    if (isTimerEnabled && fetchingStatus === fetchingStatusMap.FETCHED) {
      setCounting(true);
    }
  }, [fetchingStatus, isTimerEnabled]);

  const action = useCallback(() => {
    setCounting(false);
    fetch();
  }, [fetch]);

  const stopFetching = useCallback(() => {
    setIsTimerEnabled(false);
    setCounting(false);
  }, []);

  // timer for fetch loop
  const { duration } = useTimer(stopFetching, timeLimit, isTimerEnabled);

  // timer for fetch
  useTimer(action, waitingTime, counting);

  const countdown = renderCountdown(timeLimit, duration);

  return (
    <div className={styles.content}>
      <div className={styles.icon}></div>
      <P className={styles.description}>
        {isTimerEnabled
          ? `交易確認中，請勿離開，至多 ${countdown} 秒...`
          : `請稍待再重新整理`}
      </P>
    </div>
  );
};

InProgress.propTypes = {
  paymentRecordId: PropTypes.string,
  fetchingStatus: PropTypes.oneOf(Object.values(fetchingStatusMap)),
};

export default InProgress;
