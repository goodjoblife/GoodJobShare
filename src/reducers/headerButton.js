import { Map } from 'immutable';
import createReducer from 'utils/createReducer';
import { TOGGLE_HEADER_BUTTON } from '../actions/headerButton';

const preloadedState = Map({
  isOpen: false,
});

const headerButton = createReducer(preloadedState, {
  [TOGGLE_HEADER_BUTTON]: state => state.update('isOpen', v => !v),
});

export default headerButton;
