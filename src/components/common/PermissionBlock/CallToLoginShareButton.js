import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useIsLoggedIn } from 'hooks/auth';
import { useFacebookLogin, useGoogleLogin } from 'hooks/login';
import styles from './PermissionBlock.module.css';

const AuthenticatedButton = ({ className, to, onClick, children }) => (
  <Link className={cn('buttonCircleM', className)} to={to} onClick={onClick}>
    {children}
  </Link>
);

const AuthenticatedButtonGroup = ({ to, share }) => (
  <div className={styles.authenticatedGroup}>
    <AuthenticatedButton
      className={cn('buttonYellow', styles.button)}
      to={to}
      onClick={share}
    >
      留下一筆資料
    </AuthenticatedButton>
    <AuthenticatedButton
      className={cn('buttonHollowRed', styles.button)}
      to="/buy"
    >
      或以 99 元解鎖全站 1 個月
    </AuthenticatedButton>
  </div>
);

AuthenticatedButton.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  share: PropTypes.func,
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

const CallToLoginShareButton = ({ to, share }) => {
  const isLoggedIn = useIsLoggedIn();
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      {isLoggedIn ? (
        <AuthenticatedButtonGroup to={to} share={share} />
      ) : (
        <UnauthenticatedButton />
      )}
    </div>
  );
};

CallToLoginShareButton.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  share: PropTypes.func,
};

export default CallToLoginShareButton;
