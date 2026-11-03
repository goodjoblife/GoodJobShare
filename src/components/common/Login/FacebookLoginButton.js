import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';

import FacebookContext, { FacebookStatus } from 'contexts/FacebookContext';
import { useFacebookLogin } from 'hooks/login';

import styles from './LoginButton.module.css';

const FacebookLoginButton = ({ preload }) => {
  const { FB, status, loadFacebook, retryFacebook } = useContext(
    FacebookContext,
  );
  const fbLogin = useFacebookLogin();

  useEffect(() => {
    if (preload) loadFacebook({ trigger: 'facebook-login-button' });
  }, [loadFacebook, preload]);

  const handleClick = () => {
    if (FB) {
      fbLogin();
      return;
    }

    const options = { reportError: true, trigger: 'facebook-login' };
    if (
      status === FacebookStatus.TIMED_OUT ||
      status === FacebookStatus.FAILED
    ) {
      retryFacebook(options);
    } else {
      loadFacebook(options);
    }
  };

  const isLoading = status === FacebookStatus.LOADING;
  const preloadFacebook = () => {
    if (status === FacebookStatus.IDLE) {
      loadFacebook({ trigger: 'facebook-login-prefetch' });
    }
  };
  const buttonText = isLoading
    ? 'Facebook 登入載入中'
    : status === FacebookStatus.TIMED_OUT || status === FacebookStatus.FAILED
    ? '重試 Facebook 登入'
    : 'Facebook 登入';

  return (
    <button
      className={cn(styles.btn, styles.btnFb)}
      onClick={handleClick}
      onFocus={preloadFacebook}
      onMouseEnter={preloadFacebook}
      disabled={isLoading}
    >
      <pre>{buttonText}</pre>
    </button>
  );
};

FacebookLoginButton.propTypes = {
  preload: PropTypes.bool,
};

export default FacebookLoginButton;
