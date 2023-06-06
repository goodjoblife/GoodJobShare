import { values } from 'ramda';

export const subscriptionType = {
  submitData: 'SubmitData',
  buySubscription: 'BuySubscription',
};

export const subscriptionTypes = values(subscriptionType);
