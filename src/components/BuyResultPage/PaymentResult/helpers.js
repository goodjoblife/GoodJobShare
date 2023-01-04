import { isNil } from 'ramda';

import fetchingStatusMap from 'constants/status';
import { buyStatus, recordStatusToBuyStatus } from 'constants/payment';

export const paymentRecordStatusToBuyStatus = paymentRecord => {
  const paymentRecordData = paymentRecord.data;
  const fetchingStatus = paymentRecord.status;

  if (fetchingStatus === fetchingStatusMap.FETCHING) {
    return buyStatus.inProgress;
  }

  if (fetchingStatus === fetchingStatusMap.UNFETCHED) {
    return buyStatus.inProgress;
  }

  if (isNil(paymentRecordData)) {
    return buyStatus.inProgress;
  }

  if (fetchingStatus === fetchingStatusMap.ERROR) {
    return buyStatus.failed;
  }

  const { status } = paymentRecordData;

  if (isNil(status)) {
    return buyStatus.failed;
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
