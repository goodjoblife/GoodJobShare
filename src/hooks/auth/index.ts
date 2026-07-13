import { useSelector } from 'react-redux';

import { AuthStatus } from 'constants/authStatus';
import { User } from 'reducers/auth';
import {
  statusSelector,
  tokenSelector,
  userSelector,
} from 'selectors/authSelector';

export const useIsLoggedIn = (): boolean => {
  const status = useSelector(statusSelector);
  return status === AuthStatus.CONNECTED;
};
export const useAuthUser = (): User | undefined => useSelector(userSelector);
export const useToken = (): string | undefined => useSelector(tokenSelector);
