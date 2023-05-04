import { useCallback, useEffect, useState } from 'react';
import TapPayHelper from 'common/tappay/TapPayHelper';
import { fields, styles } from './constants';

const useTapPay = ({ handleUpdate, handlePrime }) => {
  const [tapPayCard, setTapPayCard] = useState();

  // 載入 Tappay
  useEffect(() => {
    TapPayHelper.init().then(tapPay => {
      tapPay.card.setup({ fields, styles });
      tapPay.card.onUpdate(update => {
        // 即時反應每個行為
        handleUpdate(update);
      });

      setTapPayCard(tapPay.card);
    });
  }, [handleUpdate]);

  // 送出 Tappay 表單
  const submit = useCallback(() => {
    console.log(tapPayCard);
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

  const getPrime = useCallback(() => {
    return new Promise((resolve, reject) => {
      console.log(tapPayCard);
      if (!tapPayCard) {
        resolve();
        return;
      }

      // 取得 TapPay Fields 的 status
      const tappayStatus = tapPayCard.getTappayFieldsStatus();

      // 確認是否可以 getPrime
      if (tappayStatus.canGetPrime === false) {
        reject('can not get prime');
        return;
      }

      console.log('async getPrime');
      // Get prime
      tapPayCard.getPrime(result => {
        if (result.status !== 0) {
          reject('get prime error ' + result.msg);
          return;
        }

        resolve(result.card.prime);
      });
    });
  }, [tapPayCard]);

  console.log('useTapPay', tapPayCard, getPrime);

  return [submit, getPrime];
};

export default useTapPay;
