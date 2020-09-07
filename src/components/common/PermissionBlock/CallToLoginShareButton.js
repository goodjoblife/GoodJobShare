import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useIsLogin } from 'hooks/auth';
import useFacebookLogin from 'hooks/login/useFacebookLogin';
import useGoogleLogin from 'hooks/login/useGoogleLogin';
import styles from './PermissionBlock.module.css';

const AuthenticatedButton = ({ to, onClick, children }) => (
  <Link
    className={cn('buttonCircleM', 'buttonBlack2')}
    to={to}
    onClick={onClick}
  >
    {children}
  </Link>
);

AuthenticatedButton.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const UnauthenticatedButton = () => {
  const fbLogin = useFacebookLogin();
  const googleLogin = useGoogleLogin();

  return (
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
  );
};

const CallToLoginShareButton = ({ isLoginText, to, onClick }) => {
  const isLogin = useIsLogin();
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      {isLogin ? (
        <AuthenticatedButton to={to} onClick={onClick}>
          {isLoginText}
        </AuthenticatedButton>
      ) : (
        <UnauthenticatedButton />
      )}
    </div>
  );
};

CallToLoginShareButton.propTypes = {
  isLoginText: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
};

export default CallToLoginShareButton;
