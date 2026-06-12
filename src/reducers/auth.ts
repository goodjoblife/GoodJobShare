import { SET_LOGIN, SET_USER } from 'actions/auth';
import AuthStatus from 'constants/authStatus';
import createReducer from 'utils/createReducer';

export type User = {
  _id: string;
  name: string;
  email: string | null;
};

const preloadedState: {
  status: AuthStatus;
  // null is possible when redux-persist restores state from JSON (undefined is serialized as null)
  // always access via tokenSelector to normalize null to undefined
  token?: string | null;
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
