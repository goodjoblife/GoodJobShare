import { List, fromJS } from 'immutable';
import createReducer from 'utils/createReducer';
import { LOAD_LABOR_RIGHTS_LIST } from '../actions/laborRights';

const preloadedState = List([]);

export default createReducer(preloadedState, {
  [LOAD_LABOR_RIGHTS_LIST]: (state, { items }) => fromJS(items),
});
