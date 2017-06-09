import { Map, fromJS } from 'immutable';
import createReducer from 'utils/createReducer';
import {
  SET_META_LIST_IS_FETCHING,
  SET_META_LIST_ERROR,
  SET_META_LIST,
} from '../actions/laborRightsMenu';

const preloadedState = Map({
  metaListIsFetching: false,
});

export default createReducer(preloadedState, {
  [SET_META_LIST_IS_FETCHING]: (state, { isFetching }) =>
    state.set('metaListIsFetching', isFetching),
  [SET_META_LIST_ERROR]: (state, { err }) =>
    state.set('metaListError', err),
  [SET_META_LIST]: (state, { metaList }) =>
    state.set('metaList', fromJS(metaList)),
});
