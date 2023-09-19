import { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { useLogin } from 'hooks/login';
import LoginModalContext from 'contexts/LoginModalContext';

const useLoginFlow = callback => {
  const [state, setState] = useState('init');
  const [isLoggedIn] = useLogin();
  const { isLoginModalDisplayed, setLoginModalDisplayed } = useContext(
    LoginModalContext,
  );

  useEffect(() => {
    if (state === 'submitting_check_logged_in') {
      if (isLoggedIn) {
        setState('submitting');
      } else {
        setState('init');
      }
    }
  }, [callback, isLoggedIn, state]);

  useEffect(() => {
    if (state === 'submitting') {
      setState('submitting_check_api');
      callback().then(() => {
        setState('init');
      });
    }
  }, [callback, state]);

  useEffect(() => {
    if (state === 'submitting_open_modal' && !isLoginModalDisplayed) {
      // 當 modal 關閉，檢查登入狀態
      setState('submitting_check_logged_in');
    }
  }, [isLoginModalDisplayed, state]);

  const startFlow = useCallback(() => {
    if (!isLoggedIn) {
      setLoginModalDisplayed(true);
      setState('submitting_open_modal');
    } else {
      setState('submitting');
    }
  }, [isLoggedIn, setLoginModalDisplayed]);

  const isRunning = useMemo(() => state !== 'init', [state]);

  return [startFlow, isRunning];
};

export default useLoginFlow;
