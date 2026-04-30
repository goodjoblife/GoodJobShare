import { useSelector } from 'react-redux';
import {
  statusSelector,
  userSelector,
  tokenSelector,
} from 'selectors/authSelector';
import AuthStatus from 'constants/authStatus';

export const useIsLoggedIn = (): boolean => {
  const status = useSelector(statusSelector);
  return status === AuthStatus.CONNECTED;
};
export const useAuthUser = () => useSelector(userSelector);
export const useToken = () => useSelector(tokenSelector);
