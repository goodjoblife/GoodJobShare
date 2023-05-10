import { useSelector } from 'react-redux';

import {
  redirectUrlSelector,
  paymentRecordSelector,
  subscriptionPlansSelector,
  myCurrentSubscriptionSelector,
} from '../../selectors/payment';

export const usePaymentRecord = () => useSelector(paymentRecordSelector);
export const useRedirectUrl = () => useSelector(redirectUrlSelector);
export const useSubscriptionPlans = () =>
  useSelector(subscriptionPlansSelector);
export const useMyCurrentSubscription = () =>
  useSelector(myCurrentSubscriptionSelector);

const usePayment = () => {
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
