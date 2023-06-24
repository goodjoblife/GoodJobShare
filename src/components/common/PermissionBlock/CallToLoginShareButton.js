import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useIsLoggedIn } from 'hooks/auth';
import { useFacebookLogin } from 'hooks/login';
import GoogleLoginButton from 'common/Auth/GoogleLoginButton';
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
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onClick: PropTypes.func,
};

const UnauthenticatedButton = () => {
  const fbLogin = useFacebookLogin();

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
      >
        <GoogleLoginButton onSuccess={() => {}} />
      </button>
    </div>
  );
};

const CallToLoginShareButton = ({ isLoginText, to, onAuthenticatedClick }) => {
  const isLoggedIn = useIsLoggedIn();
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      {isLoggedIn ? (
        <AuthenticatedButton to={to} onClick={onAuthenticatedClick}>
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
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onAuthenticatedClick: PropTypes.func,
};

export default CallToLoginShareButton;
