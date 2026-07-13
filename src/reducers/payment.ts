import { SET_SUBSCRIPTION_PLANS } from 'actions/fetchSubscriptionPlans';
import {
  SET_MY_CURRENT_SUBSCRIPTION,
  SET_PAYMENT_RECORD,
} from 'actions/payment';
import { PaymentRecord } from 'apis/getPaymentRecord';
import { SubscriptionPlan } from 'apis/getSubscriptionPlans';
import { CurrentSubscription } from 'apis/queryMyCurrentSubscription';
import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';

const preloadedState: {
  paymentRecord: FetchBox<PaymentRecord | null>;
  subscriptionPlans: FetchBox<SubscriptionPlan[]>;
  myCurrentSubscription: FetchBox<CurrentSubscription | null>;
} = {
  paymentRecord: getUnfetched(),
  subscriptionPlans: getUnfetched(),
  myCurrentSubscription: getUnfetched(),
};

export default createReducer(preloadedState, {
  [SET_PAYMENT_RECORD]: (
    state,
    { paymentRecord }: { paymentRecord: FetchBox<PaymentRecord | null> },
  ) => ({
    ...state,
    paymentRecord,
  }),
  [SET_SUBSCRIPTION_PLANS]: (
    state,
    { subscriptionPlans }: { subscriptionPlans: FetchBox<SubscriptionPlan[]> },
  ) => ({
    ...state,
    subscriptionPlans,
  }),
  [SET_MY_CURRENT_SUBSCRIPTION]: (
    state,
    {
      currentSubscription,
    }: { currentSubscription: FetchBox<CurrentSubscription | null> },
  ) => ({
    ...state,
    myCurrentSubscription: currentSubscription,
  }),
});
