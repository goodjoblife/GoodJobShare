import { useCallback } from 'react';
import { useEffectOnce } from 'react-use';
import { useSelector, useDispatch } from 'react-redux';
import { statusSelector, tokenSelector } from '../selectors/authSelector';
import { loginWithToken as loginWithTokenAction } from '../actions/auth';
import AuthStatus from '../constants/authStatus';

export default () => {
  // Sync token at first glance
  const dispatch = useDispatch();
  const loginWithToken = useCallback(
    token => dispatch(loginWithTokenAction(token)),
    [dispatch],
  );

  const authStatus = useSelector(statusSelector);
  const token = useSelector(tokenSelector);

  useEffectOnce(() => {
    if (authStatus === AuthStatus.CONNECTED) {
      loginWithToken(token);
    }
  });
};
