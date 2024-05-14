import { SubscriptionStatus } from 'constants/subscription';

export const subscriptionStatusWording = {
  [SubscriptionStatus.INIT]: '待確認',
  [SubscriptionStatus.OK]: '成功',
  [SubscriptionStatus.FAILED]: '失敗',
  [SubscriptionStatus.SUSPENDED]: '停權',
};

export const isFailed = status =>
  status === SubscriptionStatus.FAILED ||
  status === SubscriptionStatus.SUSPENDED;
