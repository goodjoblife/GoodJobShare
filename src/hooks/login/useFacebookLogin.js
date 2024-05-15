import { useContext, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import FacebookContext from 'contexts/FacebookContext';
import { loginWithFB } from 'actions/auth';

const useFacebookLogin = () => {
  const FB = useContext(FacebookContext);
  const dispatch = useDispatch();

  const fbLogin = useCallback(() => dispatch(loginWithFB(FB)), [FB, dispatch]);

  return fbLogin;
};

export default useFacebookLogin;
