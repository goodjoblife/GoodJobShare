import { AuthStatus } from 'constants/authStatus';
import { RootState } from 'reducers';
import { User } from 'reducers/auth';

export const statusSelector = (state: RootState): AuthStatus =>
  state.auth.status;
export const tokenSelector = (state: RootState): string | undefined =>
  state.auth.token !== null ? state.auth.token : undefined;
export const userSelector = (state: RootState): User | undefined =>
  state.auth.user;
