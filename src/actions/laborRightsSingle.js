import { fetchLaborRightsMetaList, fetchLaborRightsData } from '../utils/contentfulUtils';

export const SET_META_LIST =
    '@@LaborRightsSingle/SET_META_LIST';
export const SET_META_LIST_IS_FETCHING =
    '@@LaborRightsSingle/SET_META_LIST_IS_FETCHING';
export const SET_META_LIST_ERROR =
    '@@LaborRightsSingle/SET_META_LIST_ERROR';
export const SET_DATA =
    '@@LaborRightsSingle/SET_DATA';
export const SET_DATA_IS_FETCHING =
    '@@LaborRightsSingle/SET_DATA_IS_FETCHING';
export const SET_DATA_ERROR =
    '@@LaborRightsSingle/SET_DATA_ERROR';

const setMetaList = metaList => ({
  type: SET_META_LIST,
  metaList,
});

const setMetaListIsFetching = isFetching => ({
  type: SET_META_LIST_IS_FETCHING,
  isFetching,
});

const setMetaListError = error => ({
  type: SET_META_LIST_ERROR,
  error,
});

const fetchMetaList = () => dispatch => {
  dispatch(setMetaListIsFetching(true));
  return fetchLaborRightsMetaList().then(metaList => {
    dispatch(setMetaList(metaList));
  }).catch(err => {
    dispatch(setMetaListError(err));
  }).then(() => {
    dispatch(setMetaListIsFetching(false));
  });
};

export const fetchMetaListIfNeeded = () => (dispatch, getState) => {
  const metaList = getState().laborRightsSingle.get('metaList');
  const isFetching = getState().laborRightsSingle.get('metaListIsFetching');
  const error = getState().laborRightsSingle.get('metaListError');
  if (!metaList && !isFetching && !error) {
    return dispatch(fetchMetaList());
  }
  return Promise.resolve();
};

const setData = (id, data) => ({
  type: SET_DATA,
  id,
  data,
});

const setDataIsFetching = (id, isFetching) => ({
  type: SET_DATA_IS_FETCHING,
  id,
  isFetching,
});

const setDataError = (id, error) => ({
  type: SET_DATA_IS_FETCHING,
  id,
  error,
});

const fetchData = id => dispatch => {
  dispatch(setDataIsFetching(id, true));
  return fetchLaborRightsData(id).then(data => {
    dispatch(setData(id, data));
  }).catch(err => {
    dispatch(setDataError(id, err));
  }).then(() => {
    dispatch(setDataIsFetching(id, false));
  });
};

export const fetchDataIfNeeded = id =>
  (dispatch, getState) => {
    const data =
      getState().laborRightsSingle.getIn(
        ['dataMapById', id, 'data']
      );
    const isFetching =
      getState().laborRightsSingle.getIn(
        ['dataMapById', id, 'isFetching'],
        false
      );
    const error =
      getState().laborRightsSingle.getIn(
        ['dataMapById', id, 'dataError']
      );
    if (!data && !isFetching && !error) {
      return dispatch(fetchData(id));
    }
    return Promise.resolve();
  };
