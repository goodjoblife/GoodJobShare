import { fromJS } from 'immutable';

import createReducer from 'utils/createReducer';
import { saveToken } from 'utils/tokenUtil';
import { SET_LOGIN, SET_USER } from '../actions/auth';

import authStatus from '../constants/authStatus';

const preloadedState = fromJS({
  status: authStatus.UNKNOWN,
  token: null,
  user: {
    name: null,
  },
});

const auth = createReducer(preloadedState, {
  [SET_LOGIN]: (state, { status, token }) => {
    if (token) {
      saveToken(token);
    }
    return state.set('status', status).set('token', token);
  },
  [SET_USER]: (state, { name }) => state.setIn(['user', 'name'], name),
});

export default auth;
