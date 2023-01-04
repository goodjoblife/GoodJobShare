import { buyStatus, recordStatusToBuyStatus } from 'constants/payment';
import { isNil } from 'ramda';

export const paymentRecordStatusToBuyStatus = paymentRecord => {
  if (isNil(paymentRecord)) {
    return buyStatus.inProgress;
  }

  const { status } = paymentRecord;

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
