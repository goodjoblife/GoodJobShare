import AUTH_STATUS from '../constants/authStatus';

export const statusSelector = state => state.auth.get('status');
export const tokenSelector = state => state.auth.get('token');
export const userSelector = state => state.auth.get('user');
export const getUserName = state => state.auth.getIn(['user', 'name']);
export const getUserEmail = state => state.auth.getIn(['user', 'email']);
export const getUserEmailStatus = state =>
  state.auth.getIn(['user', 'email_status']);
export const isLoggedInSelector = state =>
  statusSelector(state) === AUTH_STATUS.CONNECTED;
