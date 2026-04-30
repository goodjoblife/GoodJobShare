import { useSelector } from 'react-redux';
import {
  statusSelector,
  userSelector,
  tokenSelector,
  getUserName,
  getUserEmailStatus,
} from 'selectors/authSelector';
import AuthStatus from 'constants/authStatus';

export const useIsLoggedIn = (): boolean => {
  const status = useSelector(statusSelector);
  return status === AuthStatus.CONNECTED;
};
export const useAuthUser = () => useSelector(userSelector);
export const useAuthUserName = () => useSelector(getUserName);
export const useAuthUserEmailStatus = () => useSelector(getUserEmailStatus);
export const useToken = () => useSelector(tokenSelector);
