import cn from 'classnames';
import React, { useContext } from 'react';

import FacebookContext from 'contexts/FacebookContext';
import { useFacebookLogin } from 'hooks/login';

import styles from './LoginButton.module.css';

const FacebookLoginButton = () => {
  const FB = useContext(FacebookContext);
  const fbLogin = useFacebookLogin();

  return (
    <button
      className={cn(styles.btn, styles.btnFb)}
      onClick={fbLogin}
      disabled={!FB}
    >
      <pre>Facebook 登入</pre>
    </button>
  );
};

export default FacebookLoginButton;
