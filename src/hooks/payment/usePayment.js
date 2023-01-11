import { useSelector } from 'react-redux';

import {
  redirectUrlSelector,
  paymentRecordSelector,
  subscriptionPlansSelector,
} from '../../selectors/payment';

export const usePaymentRecord = () => useSelector(paymentRecordSelector);
export const useRedirectUrl = () => useSelector(redirectUrlSelector);
export const useSubscriptionPlans = () =>
  useSelector(subscriptionPlansSelector);

const usePayment = () => {
  const paymentRecord = usePaymentRecord();
  const redirectUrl = useRedirectUrl();
  const subscriptionPlans = useSubscriptionPlans();

  return {
    paymentRecord,
    redirectUrl,
    subscriptionPlans,
  };
};

export default usePayment;
