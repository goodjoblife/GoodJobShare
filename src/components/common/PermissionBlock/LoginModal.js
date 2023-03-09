import React from 'react';
import cn from 'classnames';
import { useFacebookLogin, useGoogleLogin } from 'hooks/login';
import styles from './PermissionBlock.module.css';
import Modal from '../Modal';
import { P } from 'common/base';

const LoginModal = ({ ...props }) => {
  const fbLogin = useFacebookLogin();
  const googleLogin = useGoogleLogin();

  return (
    <Modal closableOnClickOutside {...props}>
      <P className={styles.loginTitle} center bold size="l">
        登入以查看文章權限
      </P>
      <div className={styles.loginBtnContainer}>
        <button
          className={`${cn('buttonCircleM')} ${styles.btn} ${styles.btnFb}`}
          onClick={async () => {
            await fbLogin();
          }}
        >
          <pre>Facebook 登入</pre>
        </button>
        <button
          className={`${cn('buttonCircleM')} ${styles.btn} ${styles.btnGoogle}`}
          onClick={async () => {
            await googleLogin();
          }}
        >
          <pre>Google 登入</pre>
        </button>
      </div>
    </Modal>
  );
};

export default LoginModal;
