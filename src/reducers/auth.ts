import createReducer from 'utils/createReducer';
import { SET_LOGIN, SET_USER } from 'actions/auth';

import AuthStatus from 'constants/authStatus';

export type User = {
  _id: string;
  name: string;
  email: string;
  email_status: unknown; // deprecated
};

const preloadedState: {
  status: AuthStatus;
  token?: string;
  user?: User;
} = {
  status: AuthStatus.UNKNOWN,
  token: undefined,
  user: undefined,
};

const auth = createReducer(preloadedState, {
  [SET_LOGIN]: (
    state,
    { status, token }: { status: AuthStatus; token?: string },
  ) => ({ ...state, status, token }),
  [SET_USER]: (state, { user }: { user?: User }) => ({
    ...state,
    user,
  }),
});

export default auth;
