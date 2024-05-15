import { values } from 'ramda';

export const subscriptionType = {
  submitData: 'SubmitData',
  buySubscription: 'BuySubscription',
};

export const subscriptionTypes = values(subscriptionType);

export const SubscriptionStatus = {
  INIT: 'INIT',
  OK: 'OK',
  FAILED: 'FAILED',
  SUSPENDED: 'SUSPENDED',
};
