/* eslint-disable no-unused-vars */
import {
  fromJS,
} from 'immutable';

import createReducer from 'utils/createReducer';
import { saveToken } from 'utils/tokenUtil';
import { SET_LOGIN } from '../actions/auth';

const preloadedState = fromJS({
  status: 'unknown',
  token: null,
});

const auth = createReducer(preloadedState, {
  [SET_LOGIN]: (state, { status, token }) => {
    if (token) {
      saveToken(token);
    }
    return state.set('status', status).set('token', token);
  },
});

export default auth;
