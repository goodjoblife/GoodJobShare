import React from 'react';

import { P } from 'common/base';
import FacebookLoginButton from 'common/Login/FacebookLoginButton';
import GoogleLoginButton from 'common/Login/GoogleLoginButton';

import styles from './LoginSection.module.css';

const LoginSection = () => {
  return (
    <div>
      <P className={styles.loginTitle} center bold size="l">
        登入後以信用卡付款
      </P>
      <div className={styles.loginBtnContainer}>
        <FacebookLoginButton />
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default LoginSection;
