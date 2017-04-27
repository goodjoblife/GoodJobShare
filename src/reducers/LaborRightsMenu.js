import { List, Map, fromJS } from 'immutable';
import createReducer from 'utils/createReducer';
import {
  SET_META_LIST_STATUS,
  SET_META_LIST,
} from '../actions/LaborRightsMenu';
import status from '../constants/status';

const preloadedState = Map({
  metaList: List(),
  metaListStatus: status.UNFETCHED,
});

export default createReducer(preloadedState, {
  [SET_META_LIST_STATUS]: (state, { nextStatus, err }) =>
    state
      .set('metaListStatus', nextStatus)
      .set('metaListError', err),
  [SET_META_LIST]: (state, { metaList }) =>
    state.set('metaList', fromJS(metaList)),
});
