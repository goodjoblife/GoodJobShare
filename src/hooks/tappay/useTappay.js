import { useEffect, useState, useCallback } from 'react';
import useScript from 'hooks/useScript';

export const fields = {
  number: {
    // css selector
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

  const TAP_PAY_APP_ID = process.env.NEXT_PUBLIC_TAP_PAY_APP_ID;
  const TAP_PAY_APP_KEY = process.env.NEXT_PUBLIC_TAP_PAY_APP_KEY;

  /* global TPDirect */

  useScript({
    id: 'tappay',
    src: 'https://js.tappaysdk.com/tpdirect/v5.12.3',
    onLoad: () => {
      TPDirect.setupSDK(TAP_PAY_APP_ID, TAP_PAY_APP_KEY, 'sandbox');
      setTappySDKLoad(true);
    },
  });

  useEffect(() => {
    if (!directCardSetup && tappaySDKLoaded) {
      TPDirect.card.setup({
        fields,
        styles,
      });

      setDirectCardSetup(true);
    }
  }, [directCardSetup, tappaySDKLoaded]);

  useEffect(() => {
    if (tappaySDKLoaded) {
      TPDirect.card.onUpdate(update => {
        // 即時反應每個行為
        console.log(update);
      });
    }
  }, [tappaySDKLoaded]);

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
