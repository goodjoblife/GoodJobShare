export enum PaymentRecordStatus {
  PENDING_AUTHORIZATION = 'PendingAuthorization',
  AUTHORIZED = 'Authorized',
  PAID = 'Paid',
  REFUNDED = 'Refunded',
  ERROR = 'Error',
  CANCELED = 'Canceled',
}

export enum SubscriptionStatus {
  INIT = 'INIT',
  OK = 'OK',
  FAILED = 'FAILED',
  SUSPENDED = 'SUSPENDED',
}
