import { useCallback, useContext } from 'react';
import { useIsLoggedIn } from 'hooks/auth';
import LoginModalContext from '../../contexts/LoginModalContext';

const useLogin = () => {
  const isLoggedIn = useIsLoggedIn();
  const { setLoginModalDisplayed } = useContext(LoginModalContext);
  const login = useCallback(() => setLoginModalDisplayed(true), [
    setLoginModalDisplayed,
  ]);
  return [isLoggedIn, login];
};

export default useLogin;
