import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import useFacebookLogin from 'hooks/login/useFacebookLogin';
import useGoogleLogin from 'hooks/login/useGoogleLogin';
import authStatus from '../../../constants/authStatus';
import styles from './PermissionBlock.module.css';

const isLogin = auth => auth.get('status') === authStatus.CONNECTED;

const AuthenticatedButton = ({ to, onAuthenticatedClick, children }) => (
  <Link
    className={cn('buttonCircleM', 'buttonBlack2')}
    to={to}
    onAuthenticatedClick={onAuthenticatedClick}
  >
    {children}
  </Link>
);

AuthenticatedButton.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onAuthenticatedClick: PropTypes.func,
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

const CallToLoginShareButton = ({
  isLoginText,
  to,
  onAuthenticatedClick,
  auth,
}) => (
  <div
    style={{
      textAlign: 'center',
    }}
  >
    {isLogin(auth) ? (
      <AuthenticatedButton to={to} onAuthenticatedClick={onAuthenticatedClick}>
        {isLoginText}
      </AuthenticatedButton>
    ) : (
      <UnauthenticatedButton />
    )}
  </div>
);

CallToLoginShareButton.propTypes = {
  isLoginText: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onAuthenticatedClick: PropTypes.func,
  auth: ImmutablePropTypes.map.isRequired,
};

export default CallToLoginShareButton;
