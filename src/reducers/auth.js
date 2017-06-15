/* eslint-disable no-unused-vars */
import {
  fromJS,
} from 'immutable';

import createReducer from 'utils/createReducer';
import { saveToken } from 'utils/tokenUtil';
import { SET_LOGIN, SET_USER } from '../actions/auth';

const preloadedState = fromJS({
  status: 'unknown',
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
  [SET_USER]: (state, { name }) =>
    state.setIn(['user', 'name'], name),
});

export default auth;
