import React, { useState, useCallback, useEffect } from 'react';
import useScript from 'hooks/useScript';
import TapPayContext from './TapPayContext';
import { TAP_PAY_APP_ID, TAP_PAY_APP_KEY } from '../../../config';

const TapPayContextProvider = ({ children }) => {
  // 初始化 TapPay 實例
  const [tapPay, setTapPay] = useState(null);
  const onLoad = useCallback(() => {
    window.TPDirect.setupSDK(TAP_PAY_APP_ID, TAP_PAY_APP_KEY, 'sandbox');
    setTapPay(window.TPDirect);
  }, []);
  const loadTapPay = useScript({
    id: 'tappay',
    src: 'https://js.tappaysdk.com/tpdirect/v5.12.3',
    onLoad,
  });

  // 初始化 TapyPay.Card 實例
  const [tapPayCard, setTapPayCard] = useState(null);
  const [tapPayCardParams, setTapPayCardParams] = useState(null);
  useEffect(() => {
    if (!tapPay || tapPayCard) return;

    tapPay.card.setup(tapPayCardParams);
    setTapPayCard(tapPay.card);
  }, [tapPay, tapPayCard, tapPayCardParams]);

  // 初始化 TapyPay.Card 方法
  const loadTapPayCard = useCallback(
    params => {
      setTapPayCardParams(params);
      loadTapPay();
    },
    [loadTapPay],
  );

  // 將初始化 TapPay.Card 實例與方法曝光給 Consumer
  return (
    <TapPayContext.Provider value={{ tapPayCard, loadTapPayCard }}>
      {children}
    </TapPayContext.Provider>
  );
};

export default TapPayContextProvider;
