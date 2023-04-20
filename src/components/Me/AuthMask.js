import React from 'react';

import { Heading } from 'common/base';
import { useLogin } from 'hooks/login';

import styles from './Me.module.css';

const AuthMask = ({ children }) => {
  const [isLoggedIn, login] = useLogin();

  if (!isLoggedIn) {
    return (
      <div>
        <Heading size="l" center>
          登入以管理我的資料
        </Heading>
        <div className={styles.loginBtnSection}>
          <button className="buttonCircleM buttonBlackLine" onClick={login}>
            登入
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default AuthMask;
