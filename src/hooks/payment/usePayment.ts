import { useSelector } from 'react-redux';

import { PaymentRecord } from 'apis/getPaymentRecord';
import { SubscriptionPlan } from 'apis/getSubscriptionPlans';
import { CurrentSubscription } from 'apis/queryMyCurrentSubscription';
import {
  myCurrentSubscriptionSelector,
  paymentRecordSelector,
  redirectUrlSelector,
  subscriptionPlansSelector,
} from 'selectors/payment';
import FetchBox from 'utils/fetchBox';

export const usePaymentRecord = (): FetchBox<PaymentRecord | null> =>
  useSelector(paymentRecordSelector);

export const useRedirectUrl = (): string | null =>
  useSelector(redirectUrlSelector);

export const useSubscriptionPlans = (): FetchBox<SubscriptionPlan[]> =>
  useSelector(subscriptionPlansSelector);

export const useMyCurrentSubscription = (): FetchBox<CurrentSubscription | null> =>
  useSelector(myCurrentSubscriptionSelector);

const usePayment = (): {
  paymentRecord: FetchBox<PaymentRecord | null>;
  redirectUrl: string | null;
  subscriptionPlans: FetchBox<SubscriptionPlan[]>;
  myCurrentSubscription: FetchBox<CurrentSubscription | null>;
} => {
  const paymentRecord = usePaymentRecord();
  const redirectUrl = useRedirectUrl();
  const subscriptionPlans = useSubscriptionPlans();
  const myCurrentSubscription = useMyCurrentSubscription();

  return {
    paymentRecord,
    redirectUrl,
    subscriptionPlans,
    myCurrentSubscription,
  };
};

export default usePayment;
