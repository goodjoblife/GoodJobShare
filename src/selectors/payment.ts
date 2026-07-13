import { PaymentRecord } from 'apis/getPaymentRecord';
import { SubscriptionPlan } from 'apis/getSubscriptionPlans';
import { CurrentSubscription } from 'apis/queryMyCurrentSubscription';
import { RootState } from 'reducers';
import FetchBox from 'utils/fetchBox';

export const redirectUrlSelector = (state: RootState): string | null =>
  state.paymentPersist.redirectUrl;

export const paymentRecordSelector = (
  state: RootState,
): FetchBox<PaymentRecord | null> => state.payment.paymentRecord;

export const subscriptionPlansSelector = (
  state: RootState,
): FetchBox<SubscriptionPlan[]> => state.payment.subscriptionPlans;

export const myCurrentSubscriptionSelector = (
  state: RootState,
): FetchBox<CurrentSubscription | null> => state.payment.myCurrentSubscription;
