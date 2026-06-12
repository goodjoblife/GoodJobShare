import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useEffectOnce } from 'react-use';

import { loginWithToken as loginWithTokenAction } from 'actions/auth';
import { useIsLoggedIn, useToken } from 'hooks/auth';

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
