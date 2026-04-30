import { RootState } from 'reducers';
import { User } from 'reducers/auth';

import AuthStatus from 'constants/authStatus';

export const statusSelector = (state: RootState): AuthStatus =>
  state.auth.status;
export const tokenSelector = (state: RootState): string | undefined =>
  state.auth.token;
export const userSelector = (state: RootState): User | undefined =>
  state.auth.user;

export const getUserName = (state: RootState): string | undefined =>
  state.auth.user ? state.auth.user.name : undefined;

export const getUserEmail = (state: RootState): string | undefined =>
  state.auth.user ? state.auth.user.email : undefined;

export const getUserEmailStatus = (state: RootState): unknown =>
  state.auth.user ? state.auth.user.email_status : undefined;
