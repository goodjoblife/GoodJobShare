import { useSelector } from 'react-redux';
import {
  statusSelector,
  userSelector,
  tokenSelector,
} from 'selectors/authSelector';
import AuthStatus from 'constants/authStatus';
import { User } from 'reducers/auth';

export const useIsLoggedIn = (): boolean => {
  const status = useSelector(statusSelector);
  return status === AuthStatus.CONNECTED;
};
export const useAuthUser = (): User | undefined => useSelector(userSelector);
export const useToken = (): string | undefined => useSelector(tokenSelector);
