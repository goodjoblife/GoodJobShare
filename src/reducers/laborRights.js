import { Map, OrderedMap } from 'immutable';
import createReducer from 'utils/createReducer';
import { SET_LABOR_RIGHTS } from '../actions/laborRights';

const preloadedState = Map({
  dataMapById: OrderedMap(),
});

export default createReducer(preloadedState, {
  [SET_LABOR_RIGHTS]: (state, { items }) => {
    const dataMapById = OrderedMap(items.reduce((partialMap, item) => ({
      ...partialMap,
      [item.id]: Map(item),
    }), {}));
    return Map({
      dataMapById,
    });
  },
});
