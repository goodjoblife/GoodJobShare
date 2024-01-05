import React, { useEffect, useRef } from 'react';
import { useContext } from 'react';
import cn from 'classnames';
import GoogleContext from 'contexts/GoogleContext';
import styles from './LoginButton.module.css';

const GoogleLoginButton = () => {
  const googleAuth = useContext(GoogleContext);
  const ref = useRef(null);

  useEffect(() => {
    if (googleAuth && ref.current) {
      googleAuth.renderButton(ref.current, {});
    }
  }, [googleAuth]);

  return (
    <div ref={ref} className={cn(styles.btn)}>
      Google 登入
    </div>
  );
};

export default GoogleLoginButton;
