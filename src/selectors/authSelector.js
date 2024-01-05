import { path } from 'ramda';

import AUTH_STATUS from 'constants/authStatus';

export const statusSelector = state => state.auth.status;
export const tokenSelector = state => state.auth.token;
export const userSelector = state => state.auth.user;
export const getUserName = path(['auth', 'user', 'name']);
export const getUserEmail = path(['auth', 'user', 'email']);
export const getUserEmailStatus = path(['auth', 'user', 'email_status']);
export const isLoggedInSelector = state =>
  statusSelector(state) === AUTH_STATUS.CONNECTED;
