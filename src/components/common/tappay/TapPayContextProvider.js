import React, { useState, useCallback, useEffect } from 'react';
import useScript from 'hooks/useScript';
import TapPayContext from './TapPayContext';
import {
  TAP_PAY_APP_ID,
  TAP_PAY_APP_KEY,
  TAP_PAY_SERVER_TYPE,
} from '../../../config';

// loadTapPay --> onLoad --> [tapPay, setTapPay] 更新
// tapPay.card.setup(tapPayCardParams);
// setTapPayCard(tapPay.card);

class TapPayHelper {
  loadingPromise = null;

  init() {
    if (this.loadingPromise) {
      return this.loadingPromise;
    }
    console.log("TapPay init");

    this.loadingPromise = new Promise(resolve => {
      const fjs = document.getElementsByTagName('script')[0];
      const js = document.createElement('script');
      js.id = 'tappay';
      js.src = 'https://js.tappaysdk.com/tpdirect/v5.12.3';
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = () => {
        window.TPDirect.setupSDK(
          TAP_PAY_APP_ID,
          TAP_PAY_APP_KEY,
          TAP_PAY_SERVER_TYPE,
        );
        resolve(window.TPDirect);
      };
    });

    return this.loadingPromise;
  }
  
}

const TapPayContextProvider = ({ children }) => {
  // 初始化 TapPay 實例
  const [tapPay, setTapPay] = useState(null);

  useEffect(() => {
    const tapPayHelper = new TapPayHelper();
    tapPayHelper.init().then(tapPay => setTapPay(tapPay));
  }, []);

  // 初始化 TapyPay.Card 方法
  const loadTapPayCard = useCallback(
    async params => {
      const tapPayHelper = new TapPayHelper();
      const tapPay = await tapPayHelper.init();

      tapPay.card.setup(params);
      return tapPay.card;
    },
    [],
  );

  // 將初始化 TapPay.Card 實例與方法曝光給 Consumer
  return (
    <TapPayContext.Provider value={{ loadTapPayCard }}>
      {children}
    </TapPayContext.Provider>
  );
};

export default TapPayContextProvider;
