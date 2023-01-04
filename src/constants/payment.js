export const buyStatus = {
  successful: 'SUCCESSFUL',
  failed: 'FAILED',
  inProgress: 'IN_PROGRESS',
};

const paymentRecordStatus = {
  pendingAuthorization: 'PendingAuthorization',
  authorized: 'Authorized',
  paid: 'Paid',
  refunded: 'Refunded',
  error: 'Error',
};

export const recordStatusToBuyStatus = {
  [paymentRecordStatus.pendingAuthorization]: buyStatus.inProgress,
  [paymentRecordStatus.authorized]: buyStatus.successful,
  [paymentRecordStatus.paid]: buyStatus.successful,
  [paymentRecordStatus.refunded]: buyStatus.successful,
  [paymentRecordStatus.error]: buyStatus.failed,
};
