import { useCallback, useEffect } from 'react';
import { fields, styles } from './constants';

const useTapPay = ({
  tapPayCard,
  loadTapPayCard,
  handleUpdate,
  handlePrime,
}) => {
  // 載入 Tappay
  useEffect(() => {
    if (loadTapPayCard) loadTapPayCard({ fields, styles });
  }, [loadTapPayCard]);

  // 註冊 Tappay listener
  useEffect(() => {
    if (!tapPayCard) return;

    tapPayCard.onUpdate(update => {
      // 即時反應每個行為
      handleUpdate(update);
    });
  }, [handleUpdate, tapPayCard]);

  // 送出 Tappay 表單
  const submit = useCallback(() => {
    if (!tapPayCard) return;

    // 取得 TapPay Fields 的 status
    const tappayStatus = tapPayCard.getTappayFieldsStatus();

    // 確認是否可以 getPrime
    if (tappayStatus.canGetPrime === false) {
      alert('can not get prime');
      return;
    }

    // Get prime
    tapPayCard.getPrime(result => {
      if (result.status !== 0) {
        alert('get prime error ' + result.msg);
        return;
      }

      handlePrime(result.card.prime);
    });
  }, [handlePrime, tapPayCard]);

  return submit;
};

export default useTapPay;
