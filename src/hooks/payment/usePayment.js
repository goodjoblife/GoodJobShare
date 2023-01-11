import { useSelector } from 'react-redux';

import {
  redirectUrlSelector,
  paymentRecordSelector,
  plansSelector,
} from '../../selectors/payment';

export const usePaymentRecord = () => useSelector(paymentRecordSelector);
export const useRedirectUrl = () => useSelector(redirectUrlSelector);
export const usePlans = () => useSelector(plansSelector);

const usePayment = () => {
  const paymentRecord = usePaymentRecord();
  const redirectUrl = useRedirectUrl();
  const plans = usePlans();

  return {
    paymentRecord,
    redirectUrl,
    plans,
  };
};

export default usePayment;
