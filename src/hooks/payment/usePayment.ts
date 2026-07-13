import { useSelector } from 'react-redux';

import { PaymentRecord } from 'apis/getPaymentRecord';
import { SubscriptionPlan } from 'apis/getSubscriptionPlans';
import { CurrentSubscription } from 'apis/queryMyCurrentSubscription';
import { useSubscriptionPlans } from 'hooks/payment/useSubscriptionPlans';
import {
  myCurrentSubscriptionSelector,
  paymentRecordSelector,
  redirectUrlSelector,
} from 'selectors/payment';
import FetchBox from 'utils/fetchBox';

export { useSubscriptionPlans };

export const usePaymentRecord = (): FetchBox<PaymentRecord | null> =>
  useSelector(paymentRecordSelector);

export const useRedirectUrl = (): string | null =>
  useSelector(redirectUrlSelector);

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
