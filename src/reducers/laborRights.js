import { Map, fromJS } from 'immutable';
import createReducer from 'utils/createReducer';
import { SET_LABOR_RIGHTS } from '../actions/laborRights';

const preloadedState = Map();

export default createReducer(preloadedState, {
  [SET_LABOR_RIGHTS]: (state, { items }) => {
    const map = items.reduce((partialMap, item) => ({
      ...partialMap,
      [item.id]: item,
    }), {});
    return fromJS(map);
  },
});
