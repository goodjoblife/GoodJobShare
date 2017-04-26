import { List, Map } from 'immutable';
import createReducer from 'utils/createReducer';
import {
  SET_ALL_LABOR_RIGHTS_META_STATUS,
  SET_ALL_LABOR_RIGHTS_META,
} from '../actions/LaborRightsSingle';
import status from '../constants/status';

const preloadedState = Map({
  metaList: List(),
});

export default createReducer(preloadedState, {
  [SET_ALL_LABOR_RIGHTS_META_STATUS]: (state, { nextStatus, err }) =>
    state
      .set('metaLisStatus', nextStatus)
      .set('metaListError', err),
  [SET_ALL_LABOR_RIGHTS_META]: (state, { metaList }) =>
    state.set('metaList', metaList),
});
