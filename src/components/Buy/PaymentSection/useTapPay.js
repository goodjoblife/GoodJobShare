import { useCallback, useEffect, useState, useMemo } from 'react';
import TapPayHelper from 'common/tappay/TapPayHelper';
import { fields, styles } from './constants';

const useTapPayCard = ({ opt, onUpdate }) => {
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

const useTapPay = ({ handleUpdate }) => {
  const opt = useMemo(() => ({ fields, styles }));
  const onUpdate = useCallback(update => {
    handleUpdate(update);
  });
  const tapPayCard = useTapPayCard({ opt, onUpdate });

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

  return [getPrime];
};

export default useTapPay;
