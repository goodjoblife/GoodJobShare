import { fromJS } from 'immutable';

import createReducer from 'utils/createReducer';
import { SET_LOGIN, SET_USER } from '../actions/auth';

import authStatus from '../constants/authStatus';

const preloadedState = fromJS({
  status: authStatus.UNKNOWN,
  token: null,
  user: {
    name: null,
    _id: null,
  },
});

const auth = createReducer(preloadedState, {
  [SET_LOGIN]: (state, { status, token }) => state.merge({ status, token }),
  [SET_USER]: (state, { user }) => state.setIn(['user'], fromJS(user)),
});

export default auth;
