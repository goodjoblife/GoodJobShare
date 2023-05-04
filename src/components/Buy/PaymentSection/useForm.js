import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { useToken } from 'hooks/auth';
import useTapPay from './useTapPay';
import { checkoutSubscriptionWithPrime } from '../../../apis/payment';
import usePushToast from 'hooks/toastNotification/usePushToast';
import { NOTIFICATION_TYPE } from 'constants/toastNotification';

const useForm = ({ skuId, isPrimary }) => {
  const [activeCardType, setActiveCardType] = useState('unknown');
  const [canGetPrime, setCanGetPrime] = useState(false);

  const handleUpdate = useCallback(update => {
    setActiveCardType(update.cardType);
    setCanGetPrime(update.canGetPrime);
  }, []);

  const pushToast = usePushToast();
  const history = useHistory();

  const token = useToken();
  const [getPrime] = useTapPay({
    handleUpdate,
  });

  const submit = useCallback(async () => {
    try {
      const prime = await getPrime();
      const [
        errorMessage,
        paymentId,
        paymentUrl,
      ] = await checkoutSubscriptionWithPrime({
        token,
        prime,
        skuId,
        isPrimary,
      });
      if (errorMessage) {
        // Some error arises.
        history.push(`/buy/result/${paymentId}`);
        return;
      }
      window.location = paymentUrl;
    } catch (error) {
      pushToast(NOTIFICATION_TYPE.ALERT, '發生未知錯誤。');
      console.error(error);
    }
  }, [getPrime, history, isPrimary, pushToast, skuId, token]);

  return {
    activeCardType,
    canGetPrime,
    submit,
  };
};

export default useForm;
