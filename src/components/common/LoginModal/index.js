import React, { useCallback, useContext, useEffect } from 'react';
import { useIsLoggedIn } from 'hooks/auth';
import LoginModalContext from 'contexts/LoginModalContext';
import Modal from 'common/Modal.js';
import FacebookLoginButton from 'common/Login/FacebookLoginButton';
import GoogleLoginButton from 'common/Login/GoogleLoginButton';
import styles from './LoginModal.module.css';

const LoginModal = () => {
  const { isLoginModalDisplayed: isOpen, setLoginModalDisplayed } = useContext(
    LoginModalContext,
  );
  const close = useCallback(() => setLoginModalDisplayed(false), [
    setLoginModalDisplayed,
  ]);
  const isLoggedIn = useIsLoggedIn();

  // setLoginModalDisplayed is immutable
  useEffect(() => {
    if (isLoggedIn && isOpen) {
      close();
    }
  }, [close, isLoggedIn, isOpen]);

  // 當 login status 改變再關

  return (
    <Modal isOpen={isOpen} hasClose close={close} closableOnClickOutside>
      <div className={styles.container}>
        <h2 style={{ fontSize: '1.4em', marginBottom: '34px' }}>登入</h2>
        <div className={styles.loginBtnContainer}>
          <FacebookLoginButton />
          <GoogleLoginButton />
        </div>
        <p className={styles['login-tips']}>
          為了避免使用者大量輸入假資訊，我們會以你的帳戶做驗證。但別擔心！您的帳戶資訊不會以任何形式被揭露、顯示。
        </p>
      </div>
    </Modal>
  );
};

export default LoginModal;
