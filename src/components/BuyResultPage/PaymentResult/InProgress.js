import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import P from 'common/base/P';
import useTimer, { countingStatusMap } from 'hooks/useTimer';
import useFetchPaymentRecord from 'hooks/payment/useFetchPaymentRecord';
import fetchingStatusMap from 'constants/fetchStatus';

import TransactionIcon from './transaction.svg';
import styles from './PaymentResult.module.css';
import { renderCountdown } from './helpers';

const waitingTime = 3000;
const timeLimit = 30000;

const InProgress = ({ paymentRecordId, fetchingStatus }) => {
  const [loopFetchCounting, setLoopFetchCounting] = useState(
    countingStatusMap.counting,
  );
  const [fetchingCounting, setFetchingCounting] = useState(
    countingStatusMap.counting,
  );
  const isTimerEnabled = fetchingCounting === countingStatusMap.counting;

  const fetch = useFetchPaymentRecord(paymentRecordId);

  useEffect(() => {
    if (isTimerEnabled && fetchingStatus === fetchingStatusMap.FETCHED) {
      setLoopFetchCounting(countingStatusMap.counting);
    }
  }, [fetchingStatus, isTimerEnabled]);

  const action = useCallback(() => {
    setLoopFetchCounting(countingStatusMap.stop);
    fetch();
  }, [fetch]);

  const stopFetching = useCallback(() => {
    setFetchingCounting(countingStatusMap.stop);
    setLoopFetchCounting(countingStatusMap.stop);
  }, []);

  // timer for keeping fetching
  const { duration } = useTimer(stopFetching, timeLimit, fetchingCounting);

  // timer for fetching looping
  useTimer(action, waitingTime, loopFetchCounting);

  const countdown = renderCountdown(timeLimit, duration);

  return (
    <div className={styles.content}>
      <img className={styles.icon} src={TransactionIcon} alt="in progress" />
      <P className={styles.description}>
        {isTimerEnabled ? (
          <span>
            交易確認中，<span className={styles.alert}>請勿離開此頁面</span>
            ，至多 {countdown} 秒...
          </span>
        ) : (
          `請稍待再重新整理`
        )}
      </P>
    </div>
  );
};

InProgress.propTypes = {
  fetchingStatus: PropTypes.oneOf(Object.values(fetchingStatusMap)),
  paymentRecordId: PropTypes.string,
};

export default InProgress;
