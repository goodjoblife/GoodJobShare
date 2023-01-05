import { useCallback, useState } from 'react';
import { useStore } from 'react-redux';
import useTapPay from './useTapPay';
import { checkoutSubscriptionWithPrime } from '../../../apis/payment';
import { tokenSelector } from '../../../selectors/authSelector';

const useForm = ({ tapPayCard, loadTapPayCard, skuId, isPrimary }) => {
  const [activeCardType, setActiveCardType] = useState('unknown');
  const [canGetPrime, setCanGetPrime] = useState(false);

  const handleUpdate = useCallback(update => {
    setActiveCardType(update.cardType);
    setCanGetPrime(update.canGetPrime);
  }, []);

  const store = useStore();
  const token = tokenSelector(store.getState());

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
        // TODO: Error handling
        console.error(error);
      }
    },
    [isPrimary, skuId, token],
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
