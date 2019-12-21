import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';
import { SET_WINDOW_SIZE } from '../actions/windowSize';

const preloadedState = fromJS({
  width: 0,
  height: 0,
});

export default createReducer(preloadedState, {
  [SET_WINDOW_SIZE]: (state, { width, height }) =>
    state.set('width', width).set('height', height),
});
