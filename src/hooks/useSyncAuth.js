import { useCallback } from 'react';
import { useEffectOnce } from 'react-use';
import { useDispatch } from 'react-redux';
import { useToken, useIsLoggedIn } from 'hooks/auth';
import { loginWithToken as loginWithTokenAction } from '../actions/auth';

export default () => {
  // Sync token at first glance
  const dispatch = useDispatch();
  const loginWithToken = useCallback(
    token => dispatch(loginWithTokenAction(token)),
    [dispatch],
  );

  const isLoggedIn = useIsLoggedIn();
  const token = useToken();

  useEffectOnce(() => {
    if (isLoggedIn) {
      loginWithToken(token);
    }
  });
};
