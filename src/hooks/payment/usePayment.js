import { useSelector } from 'react-redux';

import {
  fromUrlSelector,
  paymentRecordSelector,
} from '../../selectors/payment';

export const usePaymentRecord = () => useSelector(paymentRecordSelector);
export const useFromUrl = () => useSelector(fromUrlSelector);

const usePayment = () => {
  const paymentRecord = useSelector(paymentRecordSelector);
  const fromUrl = useSelector(fromUrlSelector);

  return {
    paymentRecord,
    fromUrl,
  };
};

export default usePayment;
