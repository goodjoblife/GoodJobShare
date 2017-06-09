import { Map, fromJS } from 'immutable';
import createReducer from 'utils/createReducer';
import {
  SET_META_LIST_IS_FETCHING,
  SET_META_LIST_ERROR,
  SET_META_LIST,
  SET_DATA_IS_FETCHING,
  SET_DATA_ERROR,
  SET_DATA,
} from '../actions/laborRightsSingle';

const preloadedState = Map({
  metaListIsFetching: false,
});

export default createReducer(preloadedState, {
  [SET_META_LIST_IS_FETCHING]: (state, { isFetching }) =>
    state.set('metaListIsFetching', isFetching),
  [SET_META_LIST_ERROR]: (state, { error }) =>
    state.set('metaListError', error),
  [SET_META_LIST]: (state, { metaList }) =>
    state.set('metaList', fromJS(metaList)),
  [SET_DATA_IS_FETCHING]: (state, { id, isFetching }) =>
    state.setIn(['dataMapById', id, 'dataIsFetching'], isFetching),
  [SET_DATA_ERROR]: (state, { id, error }) =>
    state.setIn(['dataMapById', id, 'dataError'], error),
  [SET_DATA]: (state, { id, data }) =>
    state.setIn(['dataMapById', id, 'data'], fromJS(data)),
});
