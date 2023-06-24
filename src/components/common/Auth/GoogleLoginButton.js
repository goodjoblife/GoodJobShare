import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import GoogleContext from 'contexts/GoogleContext';
import { useIsLoggedIn } from 'hooks/auth';

const GoogleLoginButton = ({ onSuccess }) => {
  const googleAuth = useContext(GoogleContext);
  const ref = useRef(null);

  // use ref in case onSuccess is mutable
  const onSuccessRef = useRef(onSuccess);
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (googleAuth && ref.current) {
      googleAuth.renderButton(ref.current, {});
    }
  }, [googleAuth]);

  useEffect(() => {
    if (isLoggedIn) {
      onSuccessRef.current();
    }
  }, [isLoggedIn]);

  return <div ref={ref}>Google 登入</div>;
};

GoogleLoginButton.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default GoogleLoginButton;
