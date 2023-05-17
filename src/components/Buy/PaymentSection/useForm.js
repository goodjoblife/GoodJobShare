import { useCallback, useState, useMemo } from 'react';
import { useHistory } from 'react-router';
import { isEmpty } from 'ramda';
import { useToken } from 'hooks/auth';
import useTapPay from './useTapPay';
import { checkoutSubscriptionWithPrime } from '../../../apis/payment';
import usePushToast from 'hooks/toastNotification/usePushToast';
import { NOTIFICATION_TYPE } from 'constants/toastNotification';
import { fields, styles } from './constants';

const useForm = ({ skuId, isPrimary }) => {
  const [activeCardType, setActiveCardType] = useState('unknown');
  const [canGetPrime, setCanGetPrime] = useState(false);

  // init tappay and register callback
  const opt = useMemo(() => ({ fields, styles }), []);
  const onUpdate = useCallback(update => {
    setActiveCardType(update.cardType);
    setCanGetPrime(update.canGetPrime);
  }, []);
  const [getPrime] = useTapPay({ opt, onUpdate });

  const pushToast = usePushToast();

  const history = useHistory();

  const token = useToken();

  const submit = useCallback(async () => {
    // FIXME: ＃1096
    try {
      const prime = await getPrime();
      let [
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

      if (isEmpty(paymentUrl)) {
        // paymentUrl 為空，表示非 3D 驗證的成功交易，修改本地跳轉的網址
        history.push(`/buy/result/${paymentId}`);
      } else {
        window.location = paymentUrl;
      }
    } catch (error) {
      // 目前有這些地方可能發生錯誤：
      // getPrime reject
      // 1. tapPayCard is not ready
      //    --> 應該不會發生，UI 的按鈕會禁止 submit
      // 2. tappayStatus.canGetPrime === false
      //    --> 應該不會發生，代表還不能拿 prime，UI 的按鈕會禁止 submit
      // 3. tapPayCard.getPrime status !== 0
      //    --> **屬於未知錯誤**
      // checkoutSubscriptionWithPrime reject
      //    --> **屬於未知錯誤**
      pushToast(NOTIFICATION_TYPE.ALERT, '發生未知錯誤。');
    }
  }, [getPrime, history, isPrimary, pushToast, skuId, token]);

  return {
    activeCardType,
    canGetPrime,
    submit,
  };
};

export default useForm;
