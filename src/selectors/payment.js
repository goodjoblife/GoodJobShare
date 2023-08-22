import { path } from 'ramda';

export const redirectUrlSelector = path(['paymentPersist', 'redirectUrl']);
export const paymentRecordSelector = path(['payment', 'paymentRecord']);
export const subscriptionPlansSelector = path(['payment', 'subscriptionPlans']);
export const myCurrentSubscriptionSelector = path([
  'payment',
  'myCurrentSubscription',
]);
export const mySubscriptionsSelector = path(['payment', 'mySubscriptions']);
