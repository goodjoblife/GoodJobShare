import { PaymentRecordStatus } from 'apis/payment';

export { PaymentRecordStatus };

export enum BuyStatus {
  SUCCESSFUL = 'SUCCESSFUL',
  FAILED = 'FAILED',
  IN_PROGRESS = 'IN_PROGRESS',
}

export const recordStatusToBuyStatus: Partial<
  Record<PaymentRecordStatus, BuyStatus>
> = {
  [PaymentRecordStatus.PENDING_AUTHORIZATION]: BuyStatus.IN_PROGRESS,
  [PaymentRecordStatus.AUTHORIZED]: BuyStatus.SUCCESSFUL,
  [PaymentRecordStatus.PAID]: BuyStatus.SUCCESSFUL,
  [PaymentRecordStatus.REFUNDED]: BuyStatus.SUCCESSFUL,
  [PaymentRecordStatus.ERROR]: BuyStatus.FAILED,
};
