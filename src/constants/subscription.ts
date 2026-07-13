import { SubscriptionPlanType } from 'apis/getSubscriptionPlans';

export { SubscriptionPlanType };
export { SubscriptionStatus } from 'apis/payment';

export const subscriptionTypes: SubscriptionPlanType[] = [
  SubscriptionPlanType.SUBMIT_DATA,
  SubscriptionPlanType.BUY_SUBSCRIPTION,
];
