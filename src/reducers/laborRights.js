import { List, Map } from 'immutable';
import createReducer from 'utils/createReducer';
import {
  SET_ALL_LABOR_RIGHTS_META,
  SET_SINGLE_LABOR_RIGHTS_DATA,
} from '../actions/laborRights';

const preloadedState = Map({
  idList: List(),
  dataMapById: Map(),
});

export default createReducer(preloadedState, {
  [SET_ALL_LABOR_RIGHTS_META]: (state, { items }) => {
    const idList = List(items.map(item => item.id));
    const dataMapById = Map(items.reduce((partialMap, item) => ({
      ...partialMap,
      [item.id]: Map({
        data: Map(item),
      }),
    }), {}));
    return Map({
      idList,
      dataMapById,
    });
  },
  [SET_SINGLE_LABOR_RIGHTS_DATA]: (state, { id, item }) =>
    state.setIn(['dataMapById', id, 'data'], Map(item)),
});
