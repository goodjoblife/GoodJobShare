import React from 'react';
import PropTypes from 'prop-types';
import { useFacebookLogin } from 'hooks/login';
import Modal from 'common/Modal.js';
import GoogleLoginButton from 'common/Auth/GoogleLoginButton';
import authStatus from '../../../constants/authStatus';
import styles from './LoginModal.module.css';

const LoginModal = ({ isOpen, close }) => {
  const fbLogin = useFacebookLogin();

  return (
    <Modal isOpen={isOpen} hasColose close={close} closableOnClickOutside>
      <div className={styles.container}>
        <h2 style={{ fontSize: '1.4em' }}>登入</h2>
        <div className={styles.modal}>
          <button
            className={styles['btn-facebook']}
            onClick={async () => {
              if ((await fbLogin()) === authStatus.CONNECTED) {
                close();
              }
            }}
          >
            Facebook 登入
          </button>
          <div className={styles['btn-google']}>
            <GoogleLoginButton
              onSuccess={() => {
                close();
              }}
            />
          </div>
          <p className={styles['login-tips']}>
            為了避免使用者大量輸入假資訊，我們會以你的帳戶做驗證。但別擔心！您的帳戶資訊不會以任何形式被揭露、顯示。
          </p>
        </div>
      </div>
    </Modal>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default LoginModal;
