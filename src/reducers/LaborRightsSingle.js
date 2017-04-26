import { List, Map, fromJS } from 'immutable';
import createReducer from 'utils/createReducer';
import {
  SET_ALL_LABOR_RIGHTS_META_STATUS,
  SET_ALL_LABOR_RIGHTS_META,
  SET_SINGLE_LABOR_RIGHTS_DATA_STATUS,
  SET_SINGLE_LABOR_RIGHTS_DATA,
} from '../actions/LaborRightsSingle';
import status from '../constants/status';

const preloadedState = Map({
  metaList: List(),
  metaListStatus: status.UNFETCHED,
  dataMapById: Map(),
});

export default createReducer(preloadedState, {
  [SET_ALL_LABOR_RIGHTS_META_STATUS]: (state, { nextStatus, err }) =>
    state
      .set('metaListStatus', nextStatus)
      .set('metaListError', err),
  [SET_ALL_LABOR_RIGHTS_META]: (state, { metaList }) =>
    state.set('metaList', fromJS(metaList)),
  [SET_SINGLE_LABOR_RIGHTS_DATA_STATUS]: (state, { id, nextStatus, err }) =>
    state
      .setIn(['dataMapById', id, 'dataStatus'], nextStatus)
      .setIn(['dataMapById', id, 'dataError'], err),
  [SET_SINGLE_LABOR_RIGHTS_DATA]: (state, { id, data }) =>
    state.setIn(['dataMapById', id, 'data'], fromJS(data)),
});
