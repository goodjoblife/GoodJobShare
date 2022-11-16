import { useEffect, useState, useCallback } from 'react';
import useScript from 'hooks/useScript';
import { TAP_PAY_APP_ID, TAP_PAY_APP_KEY } from '../../config';

export const fields = {
  number: {
    element: '#card-number',
    placeholder: '**** **** **** ****',
  },
  expirationDate: {
    element: '#card-expiration-date',
    placeholder: 'MM / YY',
  },
  ccv: {
    element: '#card-ccv',
    placeholder: 'ccv',
  },
};

const styles = {
  input: {
    color: 'gray',
  },
  'input.ccv': {
    'font-size': '16px',
  },
  ':focus': {
    color: 'black',
  },
  '.valid': {
    color: 'green',
  },
  '.invalid': {
    color: 'red',
  },
  '@media screen and (max-width: 400px)': {
    input: {
      color: 'orange',
    },
  },
};

const useTappay = ({ handlePrime }) => {
  const [tappaySDKLoaded, setTappySDKLoad] = useState(false);
  const [directCardSetup, setDirectCardSetup] = useState(false);

  /* global TPDirect */

  // 載入SDK
  useScript({
    id: 'tappay',
    src: 'https://js.tappaysdk.com/tpdirect/v5.12.3',
    onLoad: () => {
      TPDirect.setupSDK(TAP_PAY_APP_ID, TAP_PAY_APP_KEY, 'sandbox');
      setTappySDKLoad(true);
    },
  });

  // 設定 Tappay 參數
  useEffect(() => {
    if (!directCardSetup && tappaySDKLoaded) {
      TPDirect.card.setup({
        fields,
        styles,
      });

      setDirectCardSetup(true);
    }
  }, [directCardSetup, tappaySDKLoaded]);

  // 註冊 Tappay listener
  useEffect(() => {
    if (tappaySDKLoaded) {
      TPDirect.card.onUpdate(update => {
        // 即時反應每個行為
        console.log(update);
      });
    }
  }, [tappaySDKLoaded]);

  // 送出 Tappay 表單
  const submit = useCallback(() => {
    // 取得 TapPay Fields 的 status
    const tappayStatus = TPDirect.card.getTappayFieldsStatus();

    // 確認是否可以 getPrime
    if (tappayStatus.canGetPrime === false) {
      alert('can not get prime');
      return;
    }

    // Get prime
    TPDirect.card.getPrime(result => {
      if (result.status !== 0) {
        alert('get prime error ' + result.msg);
        return;
      }

      handlePrime(result.card.prime);
    });
  }, [handlePrime]);

  return submit;
};

export default useTappay;
