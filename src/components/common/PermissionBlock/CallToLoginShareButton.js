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

const CallToLoginShareButton = ({ isLoginText, to, auth }) => {
  const fbLogin = useFacebookLogin();
  const googleLogin = useGoogleLogin();

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      {isLogin(auth) ? (
        <Link className={cn('buttonCircleM', 'buttonBlack2')} to={to}>
          {isLoginText}
        </Link>
      ) : (
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
            className={`${cn('buttonCircleM')} ${styles.btn} ${
              styles.btnGoogle
            }`}
            onClick={async () => {
              await googleLogin();
            }}
          >
            <pre>Google 登入</pre>
          </button>
        </div>
      )}
    </div>
  );
};

CallToLoginShareButton.propTypes = {
  isLoginText: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  auth: ImmutablePropTypes.map,
};

export default CallToLoginShareButton;
