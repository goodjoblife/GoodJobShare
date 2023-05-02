import React from 'react';
import cn from 'classnames';
import { useGoogleLogin } from 'hooks/login';
import styles from './LoginButton.module.css';

const GoogleLoginButton = () => {
  const googleLogin = useGoogleLogin();

  return (
    <button
      className={cn('buttonCircleM', styles.btn, styles.btnGoogle)}
      onClick={googleLogin}
    >
      <pre>Google 登入</pre>
    </button>
  );
};

export default GoogleLoginButton;
