import { useCallback } from 'react';
import { useIsLoggedIn } from 'hooks/auth';
import { useHistory, useLocation } from 'react-router';

const useLogin = () => {
  const isLoggedIn = useIsLoggedIn();
  const history = useHistory();
  const { state } = useLocation();
  const login = useCallback(
    () => history.push({ state: { ...state, login: true } }),
    [history, state],
  );
  return [isLoggedIn, login];
};

export default useLogin;
