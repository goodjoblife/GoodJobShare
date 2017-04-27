import { List, Map, fromJS } from 'immutable';
import createReducer from 'utils/createReducer';
import {
  SET_META_LIST_STATUS,
  SET_META_LIST,
  SET_DATA_STATUS,
  SET_DATA,
} from '../actions/laborRightsSingle';
import status from '../constants/status';

const preloadedState = Map({
  metaList: List(),
  metaListStatus: status.UNFETCHED,
  dataMapById: Map(),
});

export default createReducer(preloadedState, {
  [SET_META_LIST_STATUS]: (state, { nextStatus, err }) =>
    state
      .set('metaListStatus', nextStatus)
      .set('metaListError', err),
  [SET_META_LIST]: (state, { metaList }) =>
    state.set('metaList', fromJS(metaList)),
  [SET_DATA_STATUS]: (state, { id, nextStatus, err }) =>
    state
      .setIn(['dataMapById', id, 'dataStatus'], nextStatus)
      .setIn(['dataMapById', id, 'dataError'], err),
  [SET_DATA]: (state, { id, data }) =>
    state.setIn(['dataMapById', id, 'data'], fromJS(data)),
});
