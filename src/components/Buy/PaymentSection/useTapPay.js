import { useCallback, useEffect, useState } from 'react';
import TapPayHelper from 'common/tappay/TapPayHelper';

const useTapPayCard = ({ opt, onUpdate }) => {
  // setup tapPay.card
  // when opt and onUpdate change, we resetup it.
  const [tapPayCard, setTapPayCard] = useState();

  // 載入 Tappay
  useEffect(() => {
    TapPayHelper.init().then(tapPay => {
      tapPay.card.setup(opt);
      tapPay.card.onUpdate(onUpdate);
      setTapPayCard(tapPay.card);
    });
  }, [onUpdate, opt]);

  return tapPayCard;
};

const useTapPay = ({ opt, onUpdate }) => {
  const tapPayCard = useTapPayCard({ opt, onUpdate });

  const getPrime = useCallback(() => {
    // getPrime is a Promise
    // resolve: when success, return prime
    // reject: for any reason, we cannot get a prime
    return new Promise((resolve, reject) => {
      if (!tapPayCard) {
        reject(new Error('tapPayCard is not ready'));
        return;
      }

      // 取得 TapPay Fields 的 status
      const tappayStatus = tapPayCard.getTappayFieldsStatus();

      // 確認是否可以 getPrime
      if (tappayStatus.canGetPrime === false) {
        reject('can not get prime');
        return;
      }

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

  return [getPrime];
};

export default useTapPay;
