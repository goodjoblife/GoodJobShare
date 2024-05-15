export const buyStatus = {
  successful: 'SUCCESSFUL',
  failed: 'FAILED',
  inProgress: 'IN_PROGRESS',
};

export const PaymentRecordStatus = {
  pendingAuthorization: 'PendingAuthorization',
  authorized: 'Authorized',
  paid: 'Paid',
  refunded: 'Refunded',
  error: 'Error',
};

export const recordStatusToBuyStatus = {
  [PaymentRecordStatus.pendingAuthorization]: buyStatus.inProgress,
  [PaymentRecordStatus.authorized]: buyStatus.successful,
  [PaymentRecordStatus.paid]: buyStatus.successful,
  [PaymentRecordStatus.refunded]: buyStatus.successful,
  [PaymentRecordStatus.error]: buyStatus.failed,
};
