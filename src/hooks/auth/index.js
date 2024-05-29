import { useSelector } from 'react-redux';
import {
  isLoggedInSelector,
  userSelector,
  tokenSelector,
  getUserName,
  getUserEmailStatus,
} from 'selectors/authSelector';

export const useIsLoggedIn = () => useSelector(isLoggedInSelector);
export const useAuthUser = () => useSelector(userSelector);
export const useAuthUserName = () => useSelector(getUserName);
export const useAuthUserEmailStatus = () => useSelector(getUserEmailStatus);
export const useToken = () => useSelector(tokenSelector);
