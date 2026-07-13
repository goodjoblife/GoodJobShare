import { isNil } from 'ramda';

import fetchingStatusMap from 'constants/fetchStatus';
import { BuyStatus, recordStatusToBuyStatus } from 'constants/payment';

export const paymentRecordToBuyStatus = paymentRecord => {
  const paymentRecordData = paymentRecord.data;
  const fetchingStatus = paymentRecord.status;

  if (fetchingStatus === fetchingStatusMap.FETCHING) {
    return BuyStatus.IN_PROGRESS;
  }

  if (fetchingStatus === fetchingStatusMap.UNFETCHED) {
    return BuyStatus.IN_PROGRESS;
  }

  if (isNil(paymentRecordData)) {
    return BuyStatus.IN_PROGRESS;
  }

  if (fetchingStatus === fetchingStatusMap.ERROR) {
    return BuyStatus.FAILED;
  }

  const { status } = paymentRecordData;

  if (isNil(status)) {
    return BuyStatus.FAILED;
  }

  return recordStatusToBuyStatus[status];
};

export const renderCountdown = (time, duration) => {
  const delta = time - duration;

  if (delta < 0) {
    return 0;
  }

  return Math.ceil(delta / 1000);
};
