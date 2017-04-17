import { List, Map } from 'immutable';
import createReducer from 'utils/createReducer';
import {
  FETCH_LABOR_RIGHTS,
  SET_LABOR_RIGHTS,
  status,
} from '../actions/laborRights';

const preloadedState = Map({
  idList: List(),
  dataMapById: Map(),
  status: status.UNFETCHED,
});

export default createReducer(preloadedState, {
  [FETCH_LABOR_RIGHTS]: (state, { done, err }) =>
    state
      .set('status', done ? status.FETCHED : status.FETCHING)
      .set('error', err),
  [SET_LABOR_RIGHTS]: (state, { items }) => {
    const idList = List(items.map(item => item.id));
    const dataMapById = Map(items.reduce((partialMap, item) => ({
      ...partialMap,
      [item.id]: Map(item),
    }), {}));
    return state.merge({
      idList,
      dataMapById,
    });
  },
});
