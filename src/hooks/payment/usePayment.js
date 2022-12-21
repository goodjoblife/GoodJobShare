import { useSelector } from 'react-redux';

import {
  redirectUrlSelector,
  paymentRecordSelector,
} from '../../selectors/payment';

export const usePaymentRecordSelector = () =>
  useSelector(paymentRecordSelector);
export const useRedirectUrlSelector = () => useSelector(redirectUrlSelector);

const usePayment = () => {
  const paymentRecord = usePaymentRecordSelector();
  const redirectUrl = useRedirectUrlSelector();

  return {
    paymentRecord,
    redirectUrl,
  };
};

export default usePayment;
