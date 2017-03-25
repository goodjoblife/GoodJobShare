/* eslint-disable no-unused-vars */
import {
  Map,
} from 'immutable';

import createReducer from 'utils/createReducer';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';

const preloadedState = Map({
  counter: 0,
});

const counter = createReducer(preloadedState, {
  [INCREMENT_COUNTER]: (state, action) => state.update('counter', v => v + 1),

  [DECREMENT_COUNTER]: (state, action) => state.update('counter', v => v - 1),
});


export default counter;
