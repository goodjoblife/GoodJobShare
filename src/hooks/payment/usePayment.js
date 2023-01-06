import { useSelector } from 'react-redux';

import {
  redirectUrlSelector,
  paymentRecordSelector,
} from '../../selectors/payment';

export const usePaymentRecord = () => useSelector(paymentRecordSelector);
export const useRedirectUrl = () => useSelector(redirectUrlSelector);

const usePayment = () => {
  const paymentRecord = usePaymentRecord();
  const redirectUrl = useRedirectUrl();

  return {
    paymentRecord,
    redirectUrl,
  };
};

export default usePayment;
