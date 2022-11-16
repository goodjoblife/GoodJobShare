import createReducer from 'utils/createReducer';
import { SET_LOGIN, SET_USER } from '../actions/auth';

import authStatus from '../constants/authStatus';

const preloadedState = {
  status: authStatus.UNKNOWN,
  token: null,
  user: {
    name: null,
    _id: null,
    email_status: null,
  },
};

const auth = createReducer(preloadedState, {
  [SET_LOGIN]: (state, { status, token }) => ({ ...state, status, token }),
  [SET_USER]: (state, { user }) => ({ ...state, user }),
});

export default auth;
