import { RootState } from 'reducers';
import { User } from 'reducers/auth';

import AuthStatus from 'constants/authStatus';

export const statusSelector = (state: RootState): AuthStatus =>
  state.auth.status;
export const tokenSelector = (state: RootState): string | undefined =>
  state.auth.token !== null ? state.auth.token : undefined;
export const userSelector = (state: RootState): User | undefined =>
  state.auth.user;
