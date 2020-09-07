import { useSelector } from 'react-redux';
import {
  isLoginSelector,
  userSelector,
  tokenSelector,
  getUserName,
  getUserEmailStatus,
} from '../../selectors/authSelector';

export const useIsLogin = () => useSelector(isLoginSelector);
export const useAuthUser = () => useSelector(userSelector);
export const useAuthUserName = () => useSelector(getUserName);
export const useAuthUserEmailStatus = () => useSelector(getUserEmailStatus);
export const useToken = () => useSelector(tokenSelector);
