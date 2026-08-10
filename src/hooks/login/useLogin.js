import { useCallback, useContext } from 'react';

import LoginModalContext from 'contexts/LoginModalContext';
import { useIsLoggedIn } from 'hooks/auth';

const useLogin = () => {
  const isLoggedIn = useIsLoggedIn();
  const { setLoginModalDisplayed } = useContext(LoginModalContext);
  const login = useCallback(() => setLoginModalDisplayed(true), [
    setLoginModalDisplayed,
  ]);
  return [isLoggedIn, login];
};

export default useLogin;
