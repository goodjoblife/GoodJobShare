import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';

const useLogout = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(logout()), [dispatch]);
};

export default useLogout;
