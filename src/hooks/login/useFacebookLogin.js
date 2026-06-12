import { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { loginWithFB } from 'actions/auth';
import FacebookContext from 'contexts/FacebookContext';

const useFacebookLogin = () => {
  const FB = useContext(FacebookContext);
  const dispatch = useDispatch();

  const fbLogin = useCallback(() => dispatch(loginWithFB(FB)), [FB, dispatch]);

  return fbLogin;
};

export default useFacebookLogin;
