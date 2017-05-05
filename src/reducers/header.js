import { Map } from 'immutable';
import createReducer from 'utils/createReducer';
import { TOGGLE_HEADER_BUTTON } from '../actions/header';

const preloadedState = Map({
  isNavOpen: false,
});

const headerButton = createReducer(preloadedState, {
  [TOGGLE_HEADER_BUTTON]: state => state.update('isNavOpen', v => !v),
});

export default headerButton;
