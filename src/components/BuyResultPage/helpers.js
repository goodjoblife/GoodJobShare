import { buyStatus } from 'constants/payment';

export const paymentRecordStatusToBuyStatus = () => {
  return buyStatus.inProgress;
};
