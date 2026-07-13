import { PaymentRecordStatus } from 'apis/payment';

export { PaymentRecordStatus };

export const buyStatus = {
  successful: 'SUCCESSFUL',
  failed: 'FAILED',
  inProgress: 'IN_PROGRESS',
};

export const recordStatusToBuyStatus = {
  [PaymentRecordStatus.PENDING_AUTHORIZATION]: buyStatus.inProgress,
  [PaymentRecordStatus.AUTHORIZED]: buyStatus.successful,
  [PaymentRecordStatus.PAID]: buyStatus.successful,
  [PaymentRecordStatus.REFUNDED]: buyStatus.successful,
  [PaymentRecordStatus.ERROR]: buyStatus.failed,
};
