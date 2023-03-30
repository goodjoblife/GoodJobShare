import { useCallback, useState } from 'react';
import { useToken } from 'hooks/auth';
import useTapPay from './useTapPay';
import { checkoutSubscriptionWithPrime } from '../../../apis/payment';
import usePushToast from 'hooks/toastNotification/usePushToast';
import { NOTIFICATION_TYPE } from 'constants/toastNotification';

const useForm = ({ tapPayCard, loadTapPayCard, skuId, isPrimary }) => {
  const [activeCardType, setActiveCardType] = useState('unknown');
  const [canGetPrime, setCanGetPrime] = useState(false);

  const handleUpdate = useCallback(update => {
    setActiveCardType(update.cardType);
    setCanGetPrime(update.canGetPrime);
  }, []);

  const pushToast = usePushToast();

  const token = useToken();
  const handlePrime = useCallback(
    async prime => {
      try {
        const paymentUrl = await checkoutSubscriptionWithPrime({
          token,
          prime,
          skuId,
          isPrimary,
        });
        window.location = paymentUrl;
      } catch (error) {
        pushToast(NOTIFICATION_TYPE.ALERT, '發生未知錯誤。');
      }
    },
    [isPrimary, pushToast, skuId, token],
  );

  const submit = useTapPay({
    tapPayCard,
    loadTapPayCard,
    handleUpdate,
    handlePrime,
  });

  return {
    activeCardType,
    canGetPrime,
    submit,
  };
};

export default useForm;
