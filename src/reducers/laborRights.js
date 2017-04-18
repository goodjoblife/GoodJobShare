import { List, Map } from 'immutable';
import createReducer from 'utils/createReducer';
import {
  SET_LABOR_RIGHTS_STATUS,
  SET_LABOR_RIGHTS,
  status,
} from '../actions/laborRights';

const preloadedState = Map({
  idList: List(),
  dataMapById: Map(),
  status: status.UNFETCHED,
});

export default createReducer(preloadedState, {
  [SET_LABOR_RIGHTS_STATUS]: (state, { nextStatus, err }) =>
    state
      .set('status', nextStatus)
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
