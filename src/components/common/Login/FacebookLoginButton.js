import cn from 'classnames';
import React from 'react';

import { useFacebookLogin } from 'hooks/login';

import styles from './LoginButton.module.css';

const FacebookLoginButton = () => {
  const fbLogin = useFacebookLogin();

  return (
    <button className={cn(styles.btn, styles.btnFb)} onClick={fbLogin}>
      <pre>Facebook 登入</pre>
    </button>
  );
};

export default FacebookLoginButton;
