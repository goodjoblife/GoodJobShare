import { useSelector } from 'react-redux';
import { statusSelector } from '../selectors/authSelector';
import AUTH_STATUS from '../constants/authStatus';

const isLoginSelector = state =>
  statusSelector(state) === AUTH_STATUS.CONNECTED;

const useIsLogin = () => useSelector(isLoginSelector);

export default useIsLogin;
