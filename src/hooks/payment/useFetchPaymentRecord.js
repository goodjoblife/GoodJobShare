import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { fetchPaymentRecord } from 'actions/payment';

const useFetchPaymentRecord = paymentRecordId => {
  const dispatch = useDispatch();

  const fetch = useCallback(() => {
    dispatch(fetchPaymentRecord(paymentRecordId));
  }, [dispatch, paymentRecordId]);

  return fetch;
};

export default useFetchPaymentRecord;
