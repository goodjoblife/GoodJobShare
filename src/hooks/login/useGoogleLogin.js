import { useContext, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import GoogleContext from 'contexts/GoogleContext';
import { loginWithGoogle } from '../../actions/auth';

const useGoogleLogin = () => {
  const googleAuth = useContext(GoogleContext);
  const dispatch = useDispatch();

  const googleLogin = useCallback(() => dispatch(loginWithGoogle(googleAuth)), [
    dispatch,
    googleAuth,
  ]);

  return googleLogin;
};

export default useGoogleLogin;
