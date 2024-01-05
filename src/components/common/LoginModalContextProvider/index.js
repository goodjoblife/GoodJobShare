import React, { useState, useMemo } from 'react';
import LoginModalContext from '../../../contexts/LoginModalContext';

const LoginModalContextProvider = ({ children }) => {
  const [isLoginModalDisplayed, setLoginModalDisplayed] = useState(false);

  const contextValue = useMemo(
    () => ({
      isLoginModalDisplayed,
      setLoginModalDisplayed,
    }),
    [isLoginModalDisplayed],
  );

  return (
    <LoginModalContext.Provider value={contextValue}>
      {children}
    </LoginModalContext.Provider>
  );
};

export default LoginModalContextProvider;
