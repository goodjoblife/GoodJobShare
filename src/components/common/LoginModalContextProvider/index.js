import React, { useState } from 'react';
import LoginModalContext from '../../../contexts/LoginModalContext';

const LoginModalContextProvider = ({ children }) => {
  const [isLoginModalDisplayed, setLoginModalDisplayed] = useState(false);
  return (
    <LoginModalContext.Provider
      value={{ isLoginModalDisplayed, setLoginModalDisplayed }}
    >
      {children}
    </LoginModalContext.Provider>
  );
};

export default LoginModalContextProvider;
