import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { paymentRecordSelector } from '../../selectors/payment';

import { fetchPaymentRecord } from '../../actions/payment';

const DELAY_IN_MS = 3000;

const isPending = paymentRecord => true;

const useFetchPaymentRecord = paymentRecordId => {
  const dispatch = useDispatch();
  const paymentRecord = useSelector(paymentRecordSelector);

  const needFetch = isPending(paymentRecord);

  useEffect(() => {
    if (!needFetch) {
      return;
    }

    const interval = setInterval(() => {
      dispatch(fetchPaymentRecord(paymentRecordId));
    }, DELAY_IN_MS);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, paymentRecordId, needFetch]);
};

export default useFetchPaymentRecord;
