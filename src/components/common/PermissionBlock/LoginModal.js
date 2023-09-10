import React from 'react';
import { P } from 'common/base';
import FacebookLoginButton from 'common/Login/FacebookLoginButton';
import GoogleLoginButton from 'common/Login/GoogleLoginButton';

import styles from './PermissionBlock.module.css';
import Modal from '../Modal';

const LoginModal = ({ ...props }) => {
  return (
    <Modal closableOnClickOutside {...props}>
      <P className={styles.loginTitle} center bold size="l">
        登入以查看文章權限
      </P>
      <div className={styles.loginBtnContainer}>
        <FacebookLoginButton />
        <GoogleLoginButton />
      </div>
    </Modal>
  );
};

export default LoginModal;
