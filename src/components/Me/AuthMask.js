import React from 'react';
import PropTypes from 'prop-types';

import { Heading } from 'common/base';
import { useLogin } from 'hooks/login';

import styles from './Me.module.css';

const AuthMask = ({ children, title }) => {
  const [isLoggedIn, login] = useLogin();

  if (!isLoggedIn) {
    return (
      <div>
        <Heading size="l" center>
          {title || '登入以管理我的資料'}
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

AuthMask.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default AuthMask;
