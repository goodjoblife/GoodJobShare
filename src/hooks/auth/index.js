import { useSelector } from 'react-redux';
import {
  isLoggedInSelector,
  userSelector,
  tokenSelector,
} from 'selectors/authSelector';

export const useIsLoggedIn = () => useSelector(isLoggedInSelector);
export const useAuthUser = () => useSelector(userSelector);
export const useToken = () => useSelector(tokenSelector);
