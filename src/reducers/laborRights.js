import { List, fromJS } from 'immutable';
import createReducer from 'utils/createReducer';
import { SET_LABOR_RIGHTS } from '../actions/laborRights';

const preloadedState = List([]);

export default createReducer(preloadedState, {
  [SET_LABOR_RIGHTS]: (state, { items }) => fromJS(items),
});
