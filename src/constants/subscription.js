import { values } from 'ramda';

export { SubscriptionStatus } from 'apis/payment';

export const subscriptionType = {
  submitData: 'SubmitData',
  buySubscription: 'BuySubscription',
};

export const subscriptionTypes = values(subscriptionType);
